import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());

// Middleware to parse JSON data from the frontend
app.use(express.json());

// Static folder for serving uploaded images
app.use('/photos', express.static(path.join(__dirname, 'public', 'photos')));

// Paths to Excel files
const productsFilePath = path.join(__dirname, 'public', 'product.xlsx');
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

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  try {
    if (!fs.existsSync(productsFilePath)) {
      return res.status(404).json({ error: 'Products file not found' });
    }
    const workbook = xlsx.readFile(productsFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    res.json({ allData });
  } catch (error) {
    console.error('Error reading products file:', error.message);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

// Endpoint to get only remote data
app.get('/api/remote-data', (req, res) => {
  try {
    if (!fs.existsSync(remoteFilePath)) {
      return res.status(404).json({ error: 'Remote data file not found' });
    }
    const workbook = xlsx.readFile(remoteFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const remoteData = xlsx.utils.sheet_to_json(worksheet);

    res.json(remoteData);
  } catch (error) {
    console.error('Error reading remote data file:', error.message);
    res.status(500).json({ error: 'Failed to fetch remote data' });
  }
});

// Endpoint to add a new remote
app.post('/api/add-remote', upload.single('image'), (req, res) => {
  try {
    const { name, shelfNumber } = req.body;

    if (!name || !shelfNumber || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Read the current data from the Excel file
    const workbook = xlsx.readFile(remoteFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    // Add new data to the array
    const newData = {
      name,
      shelfNumber,
      imagePath: `/photos/${req.file.filename}`,
    };

    allData.push(newData);

    // Write the updated data back to the Excel file
    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;
    xlsx.writeFile(workbook, remoteFilePath);

    res.status(200).json({ message: 'Remote added successfully', data: newData });
  } catch (error) {
    console.error('Error adding remote:', error.message);
    res.status(500).json({ error: 'Failed to add remote' });
  }
});

// Endpoint to update a specific product
app.put('/api/products/:index', (req, res) => {
  const { index } = req.params;
  const updatedProduct = req.body;

  try {
    if (!fs.existsSync(productsFilePath)) {
      return res.status(404).json({ error: 'Products file not found' });
    }
    const workbook = xlsx.readFile(productsFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    if (index < 0 || index >= allData.length) {
      return res.status(404).json({ error: 'Product not found at the specified index' });
    }

    allData[index] = { ...allData[index], ...updatedProduct };

    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;

    xlsx.writeFile(workbook, productsFilePath);

    res.json({ message: 'Product updated successfully!', updatedProduct });
  } catch (error) {
    console.error('Error updating products file:', error.message);
    res.status(500).json({ error: 'Failed to update the product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
