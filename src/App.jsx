import { useState } from "react";
import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/core/ProductList/ProductList";
import ProductPicker from "./components/core/ProductPicker/ProductPicker";
import "./App.css";

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
      <h1>Product List Manager</h1>
      <ProductList handleOpen={handleOpenPicker} />
      <ProductPicker
        open={isPickerOpen}
        handleClose={handleClosePicker}
        handleOpenPicker={handleOpenPicker}
      />
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
