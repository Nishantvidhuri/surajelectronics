import express from 'express';
import xlsx from 'xlsx';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// GitHub repository configuration
const GITHUB_OWNER = 'Nishantvidhuri';
const GITHUB_REPO = 'surajelectronics';
const GITHUB_BRANCH = 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// GitHub API base URL
const GITHUB_API_BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

// Directory to save uploaded photos
const uploadPath = path.join(__dirname, 'public', 'photos');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/photos', express.static(uploadPath));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Default name, updated later
  },
});
const upload = multer({ storage });

// Helper function to fetch file content from GitHub
const fetchFileFromGitHub = async (filePath) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/${filePath}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching file from GitHub:', error.response?.data || error.message);
    throw new Error('Failed to fetch file from GitHub');
  }
};

// Helper function to update file content on GitHub
const updateFileOnGitHub = async (filePath, content, sha) => {
  try {
    const response = await axios.put(
      `${GITHUB_API_BASE_URL}/${filePath}`,
      {
        message: `Update ${filePath}`,
        content: Buffer.from(content).toString('base64'),
        sha,
        branch: GITHUB_BRANCH,
      },
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating file on GitHub:', error.response?.data || error.message);
    throw new Error('Failed to update file on GitHub');
  }
};

// Endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const filePath = 'public/product.xlsx';
    const fileData = await fetchFileFromGitHub(filePath);

    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    res.json({ allData });
  } catch (error) {
    console.error('Error in /api/products:', error.message);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

// Endpoint to get remote data
app.get('/api/remote-data', async (req, res) => {
  try {
    const filePath = 'public/remote_data.xlsx';
    const fileData = await fetchFileFromGitHub(filePath);

    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const remoteData = xlsx.utils.sheet_to_json(worksheet);

    res.json(remoteData);
  } catch (error) {
    console.error('Error in /api/remote-data:', error.message);
    res.status(500).json({ error: 'Failed to fetch remote data' });
  }
});

// Endpoint to add a new remote
app.post('/api/add-remote', upload.single('image'), async (req, res) => {
  try {
    const { name, shelfNumber } = req.body;

    // Validate required fields
    if (!name || !shelfNumber || !req.file) {
      return res.status(400).json({ error: 'All fields (name, shelfNumber, image) are required.' });
    }

    // Rename the uploaded file to name_shelfNumber format
    const fileExtension = path.extname(req.file.originalname);
    const newFilename = `${name}_${shelfNumber}${fileExtension}`;
    const newFilePath = path.join(uploadPath, newFilename);

    try {
      fs.renameSync(req.file.path, newFilePath);
    } catch (fileError) {
      console.error('Error renaming file:', fileError.message);
      return res.status(500).json({ error: 'Failed to save uploaded file.' });
    }

    // Fetch the remote_data.xlsx file from GitHub
    const filePath = 'public/remote_data.xlsx';
    let fileData;
    try {
      fileData = await fetchFileFromGitHub(filePath);
    } catch (fetchError) {
      console.error('Error fetching remote_data.xlsx:', fetchError.message);
      return res.status(500).json({ error: 'Failed to fetch remote_data.xlsx from GitHub.' });
    }

    // Parse the Excel file
    let workbook, sheetName, worksheet, allData;
    try {
      workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
      sheetName = workbook.SheetNames[0];
      worksheet = workbook.Sheets[sheetName];
      allData = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
    } catch (parseError) {
      console.error('Error parsing remote_data.xlsx:', parseError.message);
      return res.status(500).json({ error: 'Failed to parse remote_data.xlsx.' });
    }

    // Add the new remote to the data
    const newData = {
      name,
      shelfNumber,
      image: `/photos/${newFilename}`, // Save file path in the 'image' column
    };
    allData.push(newData);

    // Update the Excel file
    try {
      const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
      workbook.Sheets[sheetName] = updatedWorksheet;
      const updatedContent = xlsx.write(workbook, { type: 'buffer' });

      await updateFileOnGitHub(filePath, updatedContent, fileData.sha);
    } catch (updateError) {
      console.error('Error updating remote_data.xlsx:', updateError.message);
      return res.status(500).json({ error: 'Failed to update remote_data.xlsx.' });
    }

    // Respond with success
    res.status(200).json({ message: 'Remote added successfully.', data: newData });
  } catch (error) {
    console.error('Unexpected error in /api/add-remote:', error.message);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});


// Endpoint to update a specific product
app.put('/api/products/:index', async (req, res) => {
  const { index } = req.params;
  const updatedProduct = req.body;

  try {
    const filePath = 'public/product.xlsx';
    const fileData = await fetchFileFromGitHub(filePath);

    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    if (index < 0 || index >= allData.length) {
      return res.status(404).json({ error: 'Product not found at the specified index' });
    }

    // Update the product data
    allData[index] = { ...allData[index], ...updatedProduct };

    // Write updated data back to the Excel file
    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;
    const updatedContent = xlsx.write(workbook, { type: 'buffer' });

    try {
      const response = await updateFileOnGitHub(filePath, updatedContent, fileData.sha);
      console.log('GitHub API Response:', response);

      // Re-fetch the updated file for confirmation (optional)
      const updatedFileData = await fetchFileFromGitHub(filePath);
      console.log('Updated File Content:', updatedFileData);
    } catch (updateError) {
      console.error('Error updating file on GitHub:', updateError.message);
      return res.status(500).json({ error: 'Failed to write updated data to GitHub.' });
    }

    res.json({ message: 'Product updated successfully!', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Failed to update the product' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
