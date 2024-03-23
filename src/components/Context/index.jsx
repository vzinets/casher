"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { URL } from "@/helpers/constants";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(URL);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    try {
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = useCallback((id) => {
    try {
      const response = axios.delete(`${URL}/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleEdit = useCallback(
    (id, formData) => {
      try {
        const response = axios.put(`${URL}/${id}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        fetchProducts();
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchProducts]
  );

  const contextValue = useMemo(
    () => ({
      products,
      fetchProducts,
      error,
      handleDelete,
      handleSubmit,
      handleEdit,
    }),
    [products, fetchProducts, error, handleDelete, handleSubmit, handleEdit]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("UseProduct must be used with productProvider");
  }
  return context;
}
