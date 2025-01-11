import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());

// Middleware to parse JSON data from the frontend
app.use(express.json());

// Path to the Excel file
const filePath = path.join(__dirname, "public", "products.xlsx");

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    res.json({ allData });
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

// Endpoint to get only remoteData
app.get('/api/remote-data', (req, res) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    const remoteData = allData.filter(item => item.type === 'remote'); // Adjust based on your file structure
    res.json(remoteData);
  } catch (error) {
    console.error('Error fetching remote data:', error.message);
    res.status(500).json({ error: 'Failed to fetch remote data' });
  }
});

// Endpoint to update a specific product
app.put('/api/products/:index', (req, res) => {
  const { index } = req.params;
  const updatedProduct = req.body;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allData = xlsx.utils.sheet_to_json(worksheet);

    if (index < 0 || index >= allData.length) {
      return res.status(404).json({ error: 'Product not found at the specified index' });
    }

    allData[index] = { ...allData[index], ...updatedProduct };

    const updatedWorksheet = xlsx.utils.json_to_sheet(allData);
    workbook.Sheets[sheetName] = updatedWorksheet;

    xlsx.writeFile(workbook, filePath);

    res.json({ message: 'Product updated successfully!', updatedProduct });
  } catch (error) {
    console.error('Error updating Excel file:', error.message);
    res.status(500).json({ error: 'Failed to update the product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
