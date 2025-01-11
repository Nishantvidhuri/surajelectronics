import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import simpleGit from 'simple-git';

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());
app.use(express.json());

// Static folder for serving uploaded images
app.use('/photos', express.static(path.join(__dirname, 'public', 'photos')));

// Paths to Excel files
const remoteFilePath = path.join(__dirname, 'public', 'remote_data.xlsx');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public', 'photos');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const git = simpleGit();

// Configure Git repository with PAT
git.addConfig('http.extraheader', `Authorization: token ${process.env.GITHUB_TOKEN}`);

// Endpoint to fetch all remote data
app.get('/api/remote-data', (req, res) => {
  try {
    if (!fs.existsSync(remoteFilePath)) {
      return res.status(404).json({ error: 'Remote data file not found' });
    }
    const workbook = xlsx.readFile(remoteFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    res.json({ allData });
  } catch (error) {
    console.error('Error reading remote data file:', error.message);
    res.status(500).json({ error: 'Failed to fetch remote data' });
  }
});

// Endpoint to add new remote data
app.post('/api/add-remote', upload.single('image'), async (req, res) => {
  try {
    const { name, shelfNumber } = req.body;

    if (!name || !shelfNumber || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const workbook = xlsx.readFile(remoteFilePath);
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
    xlsx.writeFile(workbook, remoteFilePath);

    // Commit and push changes to GitHub
    await git.add('./public/photos/*');
    await git.add('./public/*.xlsx');
    await git.commit('Added new remote data');
    await git.push(process.env.REPO_URL, 'main');

    res.status(200).json({ message: 'Remote added successfully', data: newData });
  } catch (error) {
    console.error('Error adding remote:', error.message);
    res.status(500).json({ error: 'Failed to add remote' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
