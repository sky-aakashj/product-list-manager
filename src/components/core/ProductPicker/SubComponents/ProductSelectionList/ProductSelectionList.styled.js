import styled, { keyframes } from "styled-components";

// Styled components for the product selection list
export const ProductWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 56px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #6d7175;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #3e4042;
  }
`;

export const LoaderContainer = styled.div`
  padding: 40px;
  text-align: center;
`;

export const CheckboxContainer = styled.div`
  hr {
    margin: 0;
  }
`;

export const ParentCheckboxContainer = styled.div`
  label {
    display: inline-flex;
    flex-direction: row;
    padding: 10px 0px 10px 30px;
    align-items: center;
    cursor: pointer;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin: 0px 10px;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ChildCheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 30px 10px 60px;
  justify-content: space-between;
  align-items: center;
  label {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ItemInfo = styled.div`
  span:first-child {
    padding-right: 40px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  align-items: center;

  span {
    font-family: "SF Pro Text Light";
    font-size: 16px;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  button:first-child {
    border: 1px solid #00000066;
    color: #00000099;
    &:hover {
      background-color: #00000030;
    }
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  border-radius: 4px;
  accent-color: #008060;

  /* Indeterminate state (minus sign) */
  &:indeterminate {
    background-color: #008060;
    border-color: #008060;
    position: relative;
  }

  &:indeterminate::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    background-color: white;
    transform: translate(-50%, -50%);
  }
`;

// Keyframes for the circular progress animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the circular progress
export const CircularProgress = styled.div`
  display: inline-block;
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  border: 4px solid #f3f3f3; /* Light gray background */
  border-top: 4px solid #008060; /* Green progress color */
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
