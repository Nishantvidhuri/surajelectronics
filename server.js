import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());

// Middleware to parse JSON data from the frontend
app.use(express.json());

// Paths to Excel files
const productsFilePath = path.join(__dirname, "public", "products.xlsx");
const remoteFilePath = path.join(__dirname, "public", "remote_data.xlsx");

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
