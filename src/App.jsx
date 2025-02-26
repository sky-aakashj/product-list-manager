import React, { useState } from "react";
import { ProductProvider, useProductContext } from "./context/ProductContext";
import "./App.css";

const AppContent = () => {
  return (
    <div className="app">
      <h1>Product List Manager</h1>
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
