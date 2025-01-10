import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import fs from 'fs'; // fs module to interact with the filesystem
import cors from 'cors'; // Import cors for CORS support

const app = express();
const PORT = 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors()); // Enable cross-origin requests

// Middleware to parse JSON data from the frontend
app.use(express.json());

// Define the endpoint to read the Excel file and return JSON
app.get("/api/products", (req, res) => {
  try {
    // Define the path to the Excel file
    const filePath = path.join(__dirname, "public", "products.xlsx");

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Assuming the first sheet contains the data
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Send the JSON response
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
    res.status(500).json({ error: "Failed to read the Excel file" });
  }
});

// Define the endpoint to get a specific product by index
app.get("/api/products/:index", (req, res) => {
  const { index } = req.params;

  try {
    const filePath = path.join(__dirname, "public", "products.xlsx");

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Check if the index exists in the data
    if (index < 0 || index >= jsonData.length) {
      return res.status(404).json({ error: "Product not found at the specified index" });
    }

    // Return the specific product at the index
    const product = jsonData[index];
    res.json(product);
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
    res.status(500).json({ error: "Failed to read the Excel file" });
  }
});

// Define the endpoint to update a specific product in the Excel file
app.put("/api/products/:index", (req, res) => {
  const { index } = req.params;
  const updatedData = req.body;

  try {
    const filePath = path.join(__dirname, "public", "products.xlsx");

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Check if the index exists in the data
    if (index < 0 || index >= jsonData.length) {
      return res.status(404).json({ error: "Product not found at the specified index" });
    }

    // Update the data at the specified index
    jsonData[index] = updatedData;

    // Convert the updated data back to a worksheet format
    const updatedWorksheet = xlsx.utils.json_to_sheet(jsonData);
    workbook.Sheets[sheetName] = updatedWorksheet;

    // Write the updated workbook back to the file
    xlsx.writeFile(workbook, filePath);

    res.json({ message: "Product updated successfully!" });
  } catch (error) {
    console.error("Error saving Excel file:", error.message);
    res.status(500).json({ error: "Failed to update the Excel file" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
