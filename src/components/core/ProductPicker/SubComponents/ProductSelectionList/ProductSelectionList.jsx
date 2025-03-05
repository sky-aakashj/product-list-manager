import { useState, useEffect, useRef, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import placeholder from "../../../../../assets/media/placeholder.png";
import Button from "../../../../ui/Button/Button";
import * as S from "./ProductSelectionList.styled";

const ProductSelectionList = (props) => {
  const {
    responseData,
    handleAdd,
    handleClose,
    setSearchValue,
    isLoading,
    fetchNewData,
    hasMoreData,
  } = props;

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const parentCheckboxRefs = useRef({});

  // Memoized mapped data with selection preservation
  const mappedData = useMemo(() => {
    if (responseData == null || !responseData) return [];

    return responseData.map((item) => {
      // Find if this product was previously selected
      const previouslySelectedProduct = selectedProducts.find(
        (selectedProduct) => selectedProduct.id === item.id
      );

      // If previously selected, restore its selection state
      if (previouslySelectedProduct) {
        return {
          ...item,
          checkedValue: previouslySelectedProduct.checkedValue,
          variants: item.variants.map((variant) => {
            const previousVariant = previouslySelectedProduct.variants.find(
              (prevVariant) => prevVariant.id === variant.id
            );
            return previousVariant
              ? { ...variant, checkedValue: previousVariant.checkedValue }
              : { ...variant, checkedValue: false };
          }),
        };
      }

      // If not previously selected, create a new entry
      return {
        id: item.id,
        title: item.title,
        inputValue: "",
        selectValue: "",
        checkedValue: false,
        discountAdded: false,
        toggleVariantButton: false,
        imageSrc: item.image.src,
        variants:
          item.variants.length === 0
            ? []
            : item.variants.map((variant) => ({
                id: variant.id,
                title: variant.title,
                price: variant.price,
                inventory_quantity: variant.inventory_quantity,
                checkedValue: false,
                discountAdded: false,
                inputValue: "",
                selectValue: "",
              })),
      };
    });
  }, [responseData, selectedProducts]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle the parent checkbox state change
  const handleParentChange = (parentId) => {
    const updatedSelectedProducts = mappedData.map((item) => {
      if (item.id === parentId) {
        const newCheckedValue = !item.checkedValue;
        return {
          ...item,
          checkedValue: newCheckedValue,
          variants: item.variants.map((variant) => ({
            ...variant,
            checkedValue: newCheckedValue,
          })),
        };
      }
      return item;
    });

    setSelectedProducts(
      updatedSelectedProducts.filter((product) =>
        product.variants.some((variant) => variant.checkedValue)
      )
    );
  };

  // Handle the child checkbox state change
  const handleChildCheckbox = (parentId, childId) => {
    const updatedSelectedProducts = mappedData.map((item) => {
      if (item.id === parentId) {
        const updatedVariants = item.variants.map((variant) =>
          variant.id === childId
            ? { ...variant, checkedValue: !variant.checkedValue }
            : variant
        );

        return {
          ...item,
          variants: updatedVariants,
          checkedValue: updatedVariants.some((v) => v.checkedValue),
        };
      }
      return item;
    });

    setSelectedProducts(
      updatedSelectedProducts.filter((product) =>
        product.variants.some((variant) => variant.checkedValue)
      )
    );
  };

  // Check if all child checkboxes are checked for a parent
  const allChildrenChecked = (parentId) => {
    const parentItem = mappedData.find((item) => item.id === parentId);
    return parentItem.variants.every((variant) => variant.checkedValue);
  };

  // Check if some child checkboxes are checked for a parent
  const someChildrenChecked = (parentId) => {
    const parentItem = mappedData.find((item) => item.id === parentId);
    return (
      parentItem.variants.some((variant) => variant.checkedValue) &&
      !allChildrenChecked(parentId)
    );
  };

  // Update indeterminate state of parent checkboxes
  useEffect(() => {
    mappedData.forEach((item) => {
      const checkbox = parentCheckboxRefs.current[item.id];
      if (checkbox) {
        checkbox.indeterminate = someChildrenChecked(item.id);
      }
    });
  }, [mappedData]);

  const parentProductsChecked = selectedProducts.length;

  return (
    <>
      <S.ProductWrapper id="product-wrapper">
        {isLoading ? (
          <S.LoaderContainer>
            <S.CircularProgress size="40px" />
          </S.LoaderContainer>
        ) : (
          <>
            {mappedData?.length === 0 ? (
              <></>
            ) : (
              <InfiniteScroll
                dataLength={
                  responseData == null || !responseData
                    ? 0
                    : responseData.length
                }
                next={fetchNewData}
                height={400}
                hasMore={hasMoreData}
                loader={
                  <div style={{ textAlign: "center" }}>
                    <S.CircularProgress size="40px" />
                  </div>
                }
              >
                {mappedData.map((item, index) => (
                  <S.CheckboxContainer key={index}>
                    <S.ParentCheckboxContainer>
                      <label>
                        <S.Checkbox
                          ref={(el) =>
                            (parentCheckboxRefs.current[item.id] = el)
                          }
                          checked={allChildrenChecked(item.id)}
                          onChange={() => handleParentChange(item.id)}
                        />
                        <img
                          src={
                            imageLoaded && item.imageSrc
                              ? `${item.imageSrc}&width=36&height=36`
                              : placeholder
                          }
                          alt="product-image"
                          onLoad={handleImageLoad}
                          loading="lazy"
                        />
                        <span>{item.title}</span>
                      </label>
                    </S.ParentCheckboxContainer>
                    <hr />
                    {item.variants.map((element, variantIndex) => (
                      <div key={variantIndex}>
                        <S.ChildCheckboxContainer>
                          <label>
                            <S.Checkbox
                              checked={element.checkedValue}
                              onChange={() =>
                                handleChildCheckbox(item.id, element.id)
                              }
                            />
                            <span>{element.title} </span>
                          </label>
                          <S.ItemInfo>
                            <span>{element?.inventory_quantity} available</span>
                            <span>{`₹${element.price}`}</span>
                          </S.ItemInfo>
                        </S.ChildCheckboxContainer>
                        <hr />
                      </div>
                    ))}
                  </S.CheckboxContainer>
                ))}
              </InfiniteScroll>
            )}
          </>
        )}
      </S.ProductWrapper>
      <hr />
      <S.ModalFooter>
        <span>{`${parentProductsChecked} ${
          parentProductsChecked === 1 ? "product" : "products"
        } selected`}</span>
        <S.ButtonWrapper>
          <Button
            size="medium"
            variant="secondary"
            onClick={() => {
              setSearchValue("");
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            size="medium"
            variant="primary"
            onClick={() => {
              if (!parentProductsChecked) {
                alert("Please select a product");
                return;
              } else {
                setSearchValue("");
                handleAdd(selectedProducts);
              }
            }}
          >
            Add
          </Button>
        </S.ButtonWrapper>
      </S.ModalFooter>
    </>
  );
};

export default ProductSelectionList;
