import { useState, useEffect, useRef } from "react";
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

  const [mappedData, setMappedData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const parentCheckboxRefs = useRef({});
  console.log("Response Data:", responseData);
  console.log("Mapped Data:", mappedData);
  console.log("Has More Data:", hasMoreData);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const parentProductsChecked = mappedData.filter((product) =>
    product.variants.some((variant) => variant.checkedValue)
  ).length;

  // Map and load the data in checkboxes
  useEffect(() => {
    setMappedData(
      responseData == null || !responseData
        ? []
        : responseData.map((item) => ({
            id: item.id,
            title: item.title,
            checkedValue: false,
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
                  })),
          }))
    );
  }, [responseData]);

  // Handle the parent checkbox state change
  const handleParentChange = (parentId) => {
    setMappedData((prevData) =>
      prevData.map((item) => {
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
      })
    );
  };

  // Handle the child checkbox state change
  const handleChildCheckbox = (parentId, childId) => {
    setMappedData((prevData) =>
      prevData.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            variants: item.variants.map((variant) =>
              variant.id === childId
                ? { ...variant, checkedValue: !variant.checkedValue }
                : variant
            ),
          };
        }
        return item;
      })
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
                      <S.Checkbox
                        ref={(el) => (parentCheckboxRefs.current[item.id] = el)}
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
        <div>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchValue("");
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (!parentProductsChecked) {
                alert("Please select a product");
                return;
              } else {
                setSearchValue("");
                handleAdd(mappedData);
              }
            }}
          >
            Add
          </Button>
        </div>
      </S.ModalFooter>
    </>
  );
};

export default ProductSelectionList;
