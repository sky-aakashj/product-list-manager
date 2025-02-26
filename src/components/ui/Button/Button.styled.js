import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: ${(props) =>
    props.variant === "primary" ? "#1a73e8" : "white"};
  color: ${(props) => (props.variant === "primary" ? "white" : "#1a73e8")};
  border: 1px solid
    ${(props) => (props.variant === "primary" ? "transparent" : "#1a73e8")};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#1765cc" : "#f8f9fa"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
