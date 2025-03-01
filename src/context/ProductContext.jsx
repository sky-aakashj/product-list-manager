import { createContext, useState, useContext } from "react";

const ProductContext = createContext([]);

export const ProductProvider = ({ children }) => {
  const initialData = [];
  const [productsData, setProductsData] = useState(initialData);

  // Function to update a specific product
  const updateProducts = (updatedData, indexOfModal) => {
    if (!updatedData || updatedData.length === 0) {
      console.error("Updated data is empty or undefined");
      return;
    }

    if (indexOfModal < 0 || indexOfModal >= productsData.length) {
      console.error("Invalid indexOfModal");
      return;
    }

    const updatedProductData = productsData.map((item, index) => {
      if (index === indexOfModal) {
        return { ...updatedData[0] }; // Update the specific item
      }
      return item;
    });

    setProductsData(updatedProductData);
  };

  // Function to add a new product container
  const addProductContainer = () => {
    setProductsData([
      ...productsData,
      {
        /* default structure */
      },
    ]);
  };

  return (
    <ProductContext.Provider
      value={{ productsData, updateProducts, addProductContainer }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);
