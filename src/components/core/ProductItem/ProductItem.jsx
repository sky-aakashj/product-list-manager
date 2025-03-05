import { useProductContext } from "../../../context/ProductContext";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Input from "../../ui/Input/Input";
import dragdots from "../../../assets/media/dragdots.svg";
import closeIcon from "../../../assets/media/closeIcon.svg";
import downArrow from "../../../assets/media/downArrow.svg";
import upArrow from "../../../assets/media/upArrow.svg";
import * as S from "./ProductItem.styled";
import Button from "../../ui/Button/Button";

const ProductItem = ({ index, variants, handleOpen, title }) => {
  const {
    deleteProductContainer,
    deleteVariants,
    handleAddDiscountState,
    getDiscountState,
    handleAddDiscountInput,
    getInputValue,
    handleToggleVariantButton,
    getToggleVariantButton,
    handleDiscountParent,
    getToggleParentButtonState,
    handleParentInput,
    parentInputValue,
    handleParentSelectInput,
    parentSelectInputValue,
    handleSelectInput,
    variantSelectValue,
  } = useProductContext();
  const isVariantVisible = getToggleVariantButton(index);

  return (
    <>
      <S.ProductItemContainer>
        <S.DragHandle src={dragdots} alt="drag-and-drop-icon" />
        <span>{`${index + 1}.`}</span>
        <Input handleOpen={handleOpen} value={title || ""} index={index} />
        {getToggleParentButtonState(index) ? (
          <S.DiscountFields isProduct={true}>
            <S.DiscountInput
              type="text"
              value={parentInputValue(index) || ""}
              onChange={(event) => handleParentInput(index, event.target.value)}
            />
            <S.DiscountSelect
              value={parentSelectInputValue(index) || ""}
              onChange={(event) =>
                handleParentSelectInput(index, event.target.value)
              }
            >
              <option value="">% Off</option>
              <option value="flat">flat off</option>
            </S.DiscountSelect>
          </S.DiscountFields>
        ) : (
          <Button
            style={{ marginLeft: "10px" }}
            size="medium"
            onClick={() => handleDiscountParent(index)}
          >
            Add Discount
          </Button>
        )}
        <S.CloseIcon
          src={closeIcon}
          alt="delete-button"
          onClick={() => deleteProductContainer(index)}
        />
        <S.VariantsContainer isVisible={variants?.length > 0}>
          <S.VariantButton
            onClick={() => {
              handleToggleVariantButton(index);
            }}
          >
            <span>{isVariantVisible ? "Hide variant" : "Show variant"}</span>
            <img
              src={isVariantVisible ? upArrow : downArrow}
              alt={isVariantVisible ? "up-arrow" : "down-arrow"}
              width="11px"
              height="21px"
            />
          </S.VariantButton>
        </S.VariantsContainer>
      </S.ProductItemContainer>
      {variants &&
        isVariantVisible &&
        variants.map((element, indexOfVariants) => (
          <div key={indexOfVariants}>
            <Droppable
              droppableId={`variant-${index}-${indexOfVariants}`}
              type="variantGroup"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Draggable
                    key={`variant-${index}-${indexOfVariants}`}
                    draggableId={`variant-${index}-${indexOfVariants}`}
                    index={indexOfVariants}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <S.ChildProductContainer>
                          <S.DragHandle
                            src={dragdots}
                            alt="drag-and-drop-icon"
                          />
                          <span>{`${indexOfVariants + 1}.`}</span>
                          <Input
                            inputType="circular"
                            handleOpen={handleOpen}
                            value={element.title || ""}
                            index={index}
                            hideButton
                          />
                          {getDiscountState(index, indexOfVariants) ? (
                            <S.DiscountFields isProduct={false}>
                              <S.DiscountInput
                                type="text"
                                value={
                                  getInputValue(index, indexOfVariants) || ""
                                }
                                onChange={(event) =>
                                  handleAddDiscountInput(
                                    index,
                                    indexOfVariants,
                                    event.target.value
                                  )
                                }
                              />
                              <S.DiscountSelect
                                value={
                                  variantSelectValue(index, indexOfVariants) ||
                                  ""
                                }
                                onChange={(event) =>
                                  handleSelectInput(
                                    index,
                                    indexOfVariants,
                                    event.target.value
                                  )
                                }
                              >
                                <option value="">% Off</option>
                                <option value="flat">flat off</option>
                              </S.DiscountSelect>
                            </S.DiscountFields>
                          ) : (
                            <S.DiscountButton
                              onClick={() =>
                                handleAddDiscountState(index, indexOfVariants)
                              }
                            >
                              Add Discount
                            </S.DiscountButton>
                          )}
                          <S.CloseIcon
                            src={closeIcon}
                            alt="delete-variant-button"
                            onClick={() =>
                              deleteVariants(index, indexOfVariants)
                            }
                          />
                        </S.ChildProductContainer>
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
    </>
  );
};

export default ProductItem;
