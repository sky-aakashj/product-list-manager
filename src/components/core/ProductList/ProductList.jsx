import { useProductContext } from "../../../context/ProductContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProductItem from "../ProductItem/ProductItem";
import Button from "../../ui/Button/Button";
import * as S from "./ProductList.styled";

const ProductList = ({ handleOpen }) => {
  const { productsData, addProductContainer, updateDndProducts } =
    useProductContext();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const handleDrag = (result) => {
    const { source, destination, type } = result;

    // Early return if no destination or same position
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    let updatedProductsData;

    if (type === "parentGroup") {
      // Reorder products
      updatedProductsData = reorder(
        productsData,
        source.index,
        destination.index
      );
    } else if (type === "variantGroup") {
      // Reorder variants within a product
      updatedProductsData = [...productsData];
      const [, productIndex, variantIndex] = source.droppableId.split("-");
      const [, , variantDestinationIndex] = destination.droppableId.split("-");

      const product = updatedProductsData[productIndex];
      product.variants = reorder(
        product.variants,
        Number(variantIndex),
        Number(variantDestinationIndex)
      );
    }

    updateDndProducts(updatedProductsData);
  };

  return (
    <S.ProductListContainer>
      <h3>Add Products</h3>
      <S.HeaderWrapper>
        <h4>Product</h4>
        <h4>Discount</h4>
      </S.HeaderWrapper>

      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="parent" type="parentGroup">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {productsData.map((item, index) => (
                <Draggable
                  key={`dragid-${index}`}
                  draggableId={`dragid-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <S.ProductItemWrapper
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <ProductItem
                        index={index}
                        title={item.title}
                        variants={item.variants}
                        handleOpen={handleOpen}
                      />
                    </S.ProductItemWrapper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <S.ButtonWrapper>
        <Button size="large" variant="outlined" onClick={addProductContainer}>
          Add Product
        </Button>
      </S.ButtonWrapper>
    </S.ProductListContainer>
  );
};

export default ProductList;
