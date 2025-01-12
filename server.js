import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// GitHub repository configuration
const GITHUB_OWNER = 'Nishantvidhuri';
const GITHUB_REPO = 'surajelectronics';
const GITHUB_BRANCH = 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// GitHub API base URL
const GITHUB_API_BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());

// Middleware to parse JSON data from the frontend
app.use(express.json());

// Static folder for serving uploaded images
const uploadPath = path.join(__dirname, 'public', 'photos');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
app.use('/photos', express.static(uploadPath));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
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
    console.error('Error fetching remote data:', error.message);
    res.status(500).json({ error: 'Failed to fetch remote data' });
  }
});

// Endpoint to add a new remote
app.post('/api/add-remote', upload.single('photo'), async (req, res) => {
  try {
    const { name, shelfNumber } = req.body;

    if (!name || !shelfNumber || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const filePath = 'public/remote_data.xlsx';
    const fileData = await fetchFileFromGitHub(filePath);

    const workbook = xlsx.read(Buffer.from(fileData.content, 'base64'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    const newData = {
      name,
      shelfNumber,
      imagePath: `/photos/${req.file.filename}`,
    };

    allData.push(newData);

    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;
    const updatedContent = xlsx.write(workbook, { type: 'buffer' });

    await updateFileOnGitHub(filePath, updatedContent, fileData.sha);

    res.status(200).json({ message: 'Remote added successfully', data: allData });
  } catch (error) {
    console.error('Error adding remote:', error.message);
    res.status(500).json({ error: 'Failed to add remote' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
