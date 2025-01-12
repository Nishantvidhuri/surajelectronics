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

    if (!name || !shelfNumber || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const fileExtension = path.extname(req.file.originalname);
    const newFilename = `${name}_${shelfNumber}${fileExtension}`;
    const newFilePath = path.join(uploadPath, newFilename);

    fs.renameSync(req.file.path, newFilePath);

    const filePath = 'public/remote_data.xlsx';
    const fileData = await fetchFileFromGitHub(filePath);

    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    const newData = {
      name,
      shelfNumber,
      image: `/photos/${newFilename}`, // Save file path in 'image' column
    };

    allData.push(newData);

    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;
    const updatedContent = xlsx.write(workbook, { type: 'buffer' });

    await updateFileOnGitHub(filePath, updatedContent, fileData.sha);

    res.status(200).json({ message: 'Remote added successfully', data: newData });
  } catch (error) {
    console.error('Error adding remote:', error.message);
    res.status(500).json({ error: 'Failed to add remote' });
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

    allData[index] = { ...allData[index], ...updatedProduct };

    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;
    const updatedContent = xlsx.write(workbook, { type: 'buffer' });

    await updateFileOnGitHub(filePath, updatedContent, fileData.sha);

    res.json({ message: 'Product updated successfully!', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Failed to update the product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
