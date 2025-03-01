import { useContext } from "react";
import { useProductContext } from "../../../context/ProductContext";
import Input from "../../ui/Input/Input";
import dragdots from "../../../assets/media/dragdots.svg";
import Button from "../../ui/Button/Button";
import * as S from "./ProductItem.styled";
const ProductItem = (props) => {
  const { index, title, handleOpen, value } = props;
  const handleClick = () => {
    console.log("products");
  };
  return (
    <>
      <S.ProductItemContainer>
        <img src={dragdots} alt="dragdots"></img>
        <span>{`${index + 1}.`}</span>
        <Input handleOpen={handleOpen} value={value} />
        <Button variant="primary" onClick={handleClick}>
          Add Discount
        </Button>
      </S.ProductItemContainer>
    </>
  );
};

export default ProductItem;
