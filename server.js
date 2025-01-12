import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// GitHub repository configuration
const GITHUB_OWNER = 'Nishantvidhuri';
const GITHUB_REPO = 'surajelectronics';
const GITHUB_BRANCH = 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Loaded from .env

// GitHub API base URL
const GITHUB_API_BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

// Enable CORS
app.use(cors());

// Middleware to parse JSON data from the frontend
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to fetch file content from GitHub
const fetchFileFromGitHub = async (filePath) => {
  const url = `${GITHUB_API_BASE_URL}/${filePath}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  return response.data;
};

// Helper to update file content on GitHub
const updateFileOnGitHub = async (filePath, content, sha) => {
  const url = `${GITHUB_API_BASE_URL}/${filePath}`;
  const response = await axios.put(
    url,
    {
      message: `Update ${filePath}`,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: GITHUB_BRANCH,
    },
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

// Endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const filePath = 'public/product.xlsx';
    const fileData = await fetchFileFromGitHub(filePath);

    // Convert base64 content back to buffer and read as Excel file
    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    res.json({ allData });
  } catch (error) {
    console.error('Error reading products file:', error.message);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

// Endpoint to add a new remote
app.post('/api/add-remote', upload.single('image'), async (req, res) => {
  try {
    const { name, shelfNumber } = req.body;

    if (!name || !shelfNumber || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const filePath = 'public/remote_data.xlsx';
    const fileData = await fetchFileFromGitHub(filePath);

    // Convert base64 content back to buffer and read as Excel file
    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    // Add new data
    const newData = {
      name,
      shelfNumber,
      imagePath: `/photos/${req.file.originalname}`,
    };
    allData.push(newData);

    // Update the Excel file
    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;
    const updatedContent = xlsx.write(workbook, { type: 'buffer' });

    // Upload updated file to GitHub
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

    // Convert base64 content back to buffer and read as Excel file
    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    if (index < 0 || index >= allData.length) {
      return res.status(404).json({ error: 'Product not found at the specified index' });
    }

    allData[index] = { ...allData[index], ...updatedProduct };

    // Update the Excel file
    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;
    const updatedContent = xlsx.write(workbook, { type: 'buffer' });

    // Upload updated file to GitHub
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
