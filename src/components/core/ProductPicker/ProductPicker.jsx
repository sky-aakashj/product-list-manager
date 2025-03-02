import { useState, useEffect } from "react";
import { useProductContext } from "../../../context/ProductContext";
import { searchProducts } from "../../../api";
import ProductSelectionList from "./SubComponents/ProductSelectionList/ProductSelectionList";
import * as S from "./ProductPicker.styled";
import searchIcon from "../../../assets/media/searchIcon.svg";
import closeModal from "../../../assets/media/closeModal.svg";

const ProductPicker = ({ open, handleClose, handleOpenPicker }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [responseData, setResponseData] = useState([]);
  const { updateProducts } = useProductContext();
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Fetch data when searchValue changes
  useEffect(() => {
    if (!open) return; // Don't fetch if modal is closed
    setPage(1);
    setHasMoreData(true);
    const timerId = setTimeout(() => {
      setIsLoading(true);
      fetchProducts(1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchValue, open]);

  // Fetch products from API
  const fetchProducts = async (newpage) => {
    try {
      const data = await searchProducts(searchValue, newpage, 10);
      if (newpage === 1) {
        console.log("fetched 1", data, page);
        setResponseData(data);
      } else {
        console.log("fetched", data);
        setResponseData((prev) => [...prev, ...data]);
      }
      if (data.length < 10) setHasMoreData(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch new data for infinite scroll
  const fetchNewData = async () => {
    if (!hasMoreData) return;
    setPage((prev) => {
      const newPage = prev + 1;
      fetchProducts(newPage);
      return newPage;
    });
    // Call fetchProducts after incrementing the page
  };

  // Handle add products
  const handleAdd = (mappedData) => {
    if (mappedData && mappedData.length > 0) {
      updateProducts(mappedData);
      handleOpenPicker(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  if (!open) return null;

  return (
    <S.Backdrop onClick={handleClose}>
      <S.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Search Product</S.ModalTitle>
          <S.CloseButton
            src={closeModal}
            alt="close-button"
            onClick={() => {
              setSearchValue("");
              handleClose();
            }}
          />
        </S.ModalHeader>
        <S.HorizontalLine />
        <S.SearchBar>
          <img src={searchIcon} alt="search-icon" />
          <input
            type="text"
            placeholder="Search product"
            value={searchValue}
            onChange={handleInputChange}
            autoFocus
          />
        </S.SearchBar>
        <S.HorizontalLine />
        <ProductSelectionList
          responseData={responseData}
          handleAdd={handleAdd}
          handleClose={handleClose}
          setSearchValue={setSearchValue}
          isLoading={isLoading}
          fetchNewData={fetchNewData}
          hasMoreData={hasMoreData}
        />
      </S.ModalWrapper>
    </S.Backdrop>
  );
};

export default ProductPicker;
