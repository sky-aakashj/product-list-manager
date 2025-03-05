// Button.styled.js
import styled from "styled-components";

// Define size configurations
const getSizeStyles = (size) => {
  switch (size) {
    case "small":
      return `
        padding: 6px 12px;
        font-size: 12px;
      `;
    case "medium":
      return `
        padding: 8px 16px;
        font-size: 14px;
      `;
    case "large":
      return `
        padding: 10px 20px;
        font-size: 16px;
      `;
    default:
      return `
        padding: 8px 16px;
        font-size: 14px;
      `;
  }
};

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  // Apply size-specific styles
  ${(props) => getSizeStyles(props.size)}

  background-color: ${(props) =>
    props.variant === "primary" ? "#008060" : "transparent"};
  color: ${(props) => (props.variant === "primary" ? "white" : "#008060")};
  border: 1px solid
    ${(props) => (props.variant === "primary" ? "transparent" : "#008060")};
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#006e52" : "#00806030"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
