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

// Multer setup for file uploads
const upload = multer({
  dest: path.join(__dirname, 'public/photos'),
});

// Paths to Excel files
const productsFilePath = path.join(__dirname, "public", "products.xlsx");
const remoteFilePath = path.join(__dirname, "public", "remote_data.xlsx");

// Utility function to ensure file exists or create it
const ensureExcelFile = (filePath, sheetName) => {
  if (!fs.existsSync(filePath)) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    xlsx.writeFile(workbook, filePath);
  }
};

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  try {
    ensureExcelFile(productsFilePath, 'Products');
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
    ensureExcelFile(remoteFilePath, 'RemoteData');
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

// Endpoint to update a specific product
app.put('/api/products/:index', (req, res) => {
  const { index } = req.params;
  const updatedProduct = req.body;

  try {
    ensureExcelFile(productsFilePath, 'Products');
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

// Endpoint to add a new remote
app.post('/api/remote-data', upload.single('image'), (req, res) => {
  const { name, shelfNumber } = req.body;
  const image = req.file;

  if (!name || !shelfNumber || !image) {
    return res.status(400).json({ error: 'Name, shelf number, and image are required' });
  }

  try {
    ensureExcelFile(remoteFilePath, 'RemoteData');

    const workbook = xlsx.readFile(remoteFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const remoteData = xlsx.utils.sheet_to_json(worksheet);

    const newRemote = {
      name,
      shelfNumber,
      imagePath: `/photos/${image.filename}`, // Save relative image path
    };

    remoteData.push(newRemote);

    const updatedWorksheet = xlsx.utils.json_to_sheet(remoteData);
    workbook.Sheets[sheetName] = updatedWorksheet;

    xlsx.writeFile(workbook, remoteFilePath);

    res.json({ message: 'Remote added successfully!', newRemote });
  } catch (error) {
    console.error('Error adding new remote:', error.message);
    res.status(500).json({ error: 'Failed to add new remote' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
