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


  const contextValue = useMemo(
    () => ({
      products,
      fetchProducts,
      error,
    }),
    [products, fetchProducts, error]
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
