import { useState } from "react";
import styled from "styled-components";
import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/core/ProductList/ProductList";
import ProductPicker from "./components/core/ProductPicker/ProductPicker";
import "./App.css";

const Header = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppContent = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const handleOpenPicker = () => {
    setIsPickerOpen(true);
  };
  const handleClosePicker = () => {
    setIsPickerOpen(false);
  };
  return (
    <div className="app">
      <Header>Product List Manager</Header>
      <ProductList handleOpen={handleOpenPicker} />
      <ProductPicker open={isPickerOpen} handleClose={handleClosePicker} />
    </div>
  );
};

const App = () => {
  return (
    <ProductProvider>
      <AppContent />
    </ProductProvider>
  );
};

export default App;
