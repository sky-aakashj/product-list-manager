import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  // Add a new empty product at the end
  const addEmptyProduct = () => {
    setProductList([...productList, { empty: true }]);
  };

  return (
    <ProductContext.Provider
      value={{
        productList,
        setProductList,
        addEmptyProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
