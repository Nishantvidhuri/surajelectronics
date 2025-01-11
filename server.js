import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";
import cors from "cors";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GitHub repository details
const GITHUB_REPO = "Nishantvidhuri/surajelectronics";
const BRANCH = "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Token from .env
const FILE_PATH = "public/remote_data.xlsx";

// Helper function to get file content from GitHub
const getFileFromGitHub = async () => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });
    const fileContent = Buffer.from(response.data.content, "base64");
    const sha = response.data.sha; // File SHA for updating later
    return { fileContent, sha };
  } catch (error) {
    console.error("Error fetching file from GitHub:", error.message);
    throw error;
  }
};

// Helper function to update file content on GitHub
const updateFileOnGitHub = async (updatedContent, sha) => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const base64Content = Buffer.from(updatedContent).toString("base64");
    await axios.put(
      url,
      {
        message: "Updated remote data",
        content: base64Content,
        sha,
        branch: BRANCH,
      },
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      }
    );
  } catch (error) {
    console.error("Error updating file on GitHub:", error.message);
    throw error;
  }
};

// Endpoint to fetch all remote data
app.get("/api/remote-data", async (req, res) => {
  try {
    const { fileContent } = await getFileFromGitHub();
    const workbook = xlsx.read(fileContent, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch remote data" });
  }
});

// Endpoint to add new remote data
app.post("/api/add-remote", upload.single("image"), async (req, res) => {
  try {
    const { name, shelfNumber } = req.body;

    if (!name || !shelfNumber || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { fileContent, sha } = await getFileFromGitHub();
    const workbook = xlsx.read(fileContent, { type: "buffer" });
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
    const updatedContent = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    await updateFileOnGitHub(updatedContent, sha);

    res.status(200).json({ message: "Remote added successfully", data: newData });
  } catch (error) {
    res.status(500).json({ error: "Failed to add remote" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
