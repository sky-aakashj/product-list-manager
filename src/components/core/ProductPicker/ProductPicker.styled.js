import styled from "styled-components";

// Backdrop
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  z-index: 1000;
`;
// Modal wrapper
export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 663px;
  height: auto;
  max-height: 612px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1001; // Ensuring that the modal is on top of other elements
`;

// Modal header
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

// Modal title
export const ModalTitle = styled.h3`
  font-weight: 500;
  padding: 20px 5px 20px 30px;
  margin: 0;
`;

// Close button
export const CloseButton = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

// Horizontal line
export const HorizontalLine = styled.hr`
  border: 1px solid #0000001a;
  margin: 0;
`;

// Search bar
export const SearchBar = styled.div`
  width: 600px;
  height: 32px;
  border: 1px solid #00000012;
  margin: 10px auto;
  display: flex;
  align-items: center;

  img {
    padding: 0px 5px 0px 20px;
    vertical-align: middle;
  }

  input {
    border: none;
    outline: none;
    width: 90%;
    padding: 0 10px;
    font-size: 14px;
  }
`;
