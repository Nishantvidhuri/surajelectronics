import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [remoteData, setRemoteData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://surajelectronics.onrender.com/api/products");
        setRemoteData(response.data.remoteData || []);
        setAllData(response.data.allData || []);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        setError("Failed to fetch product data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to update a specific product
  const updateProduct = async (index, updatedProduct) => {
    try {
      const response = await axios.put(
        `https://surajelectronics.onrender.com/api/products/${index}`,
        updatedProduct
      );
      console.log(response.data.message);

      // Update the frontend state
      setAllData((prevAllData) => {
        const updatedAllData = [...prevAllData];
        updatedAllData[index] = updatedProduct;
        return updatedAllData;
      });
    } catch (error) {
      console.error("Error updating product:", error.message);
      setError("Failed to update the product. Please try again.");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        remoteData,
        allData,
        setAllData,
        updateProduct,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
