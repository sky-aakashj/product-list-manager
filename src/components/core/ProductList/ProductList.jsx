import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Input from "../../ui/Input/Input";
import dragdots from "../../../assets/media/dragdots.svg";
import ProductItem from "../ProductItem/ProductItem";
import Button from "../../ui/Button/Button";
import * as S from "./ProductList.styled";

const ProductList = (props) => {
  const { handleOpen } = props;
  const initialData = [
    {
      id: 1,
      title: "",
    },
  ];

  const [showVariant, setShowVariant] = useState(false);
  const [productList, setProductList] = useState(initialData);

  const handleAddProduct = () => {
    setProductList([
      ...productList,
      {
        id: Date.now(),
        title: "",
      },
    ]);
  };

  return (
    <S.ProductListContainer>
      <h3>Add Products</h3>
      <h4>Product</h4>
      {productList.map((item, index) => (
        <ProductItem
          index={index + 1}
          title={item.title}
          key={item.id}
          handleOpen={handleOpen}
        />
      ))}
      <S.ButtonWrapper>
        <Button variant="outlined" onClick={handleAddProduct}>
          Add Product
        </Button>
      </S.ButtonWrapper>
    </S.ProductListContainer>
  );
};

export default ProductList;
