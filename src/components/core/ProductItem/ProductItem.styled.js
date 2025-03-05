import styled from "styled-components";

export const ProductItemContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 30px max-content max-content max-content;
  width: fit-content;
  margin-top: 20px;
  align-items: center;
  cursor: default;
`;
export const ChildProductContainer = styled(ProductItemContainer)`
  width: auto;
  justify-content: end;
`;

export const DragHandle = styled.img`
  cursor: grab;
  margin-right: 20px;
`;

export const DiscountButton = styled.button`
  cursor: pointer;
  margin-left: 20px;
  vertical-align: middle;
  background-color: #008060;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: "SF Pro Text Light";
  font-size: 14px;

  &:hover {
    background-color: #00664d;
  }
`;

export const CloseIcon = styled.img`
  cursor: pointer;
  margin-left: 20px;
  vertical-align: middle;
  width: 11.67px;
  height: 11.67px;
`;

export const DiscountFields = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  input,
  select {
    border-radius: ${(props) => (props.isProduct ? "4px" : "30px")};
  }
`;

export const DiscountInput = styled.input`
  border: 1px solid #00000012;
  width: 69px;
  box-shadow: 0px 2px 4px 0px #0000001a;
  padding: 5px;
  font-family: "SF Pro Text Light";
  font-size: 14px;
  height: 20px;

  &:focus-visible {
    outline: 2px solid #008060;
  }
`;

export const DiscountSelect = styled.select`
  border: 1px solid #00000012;
  width: 95px;
  height: 33.6px;
  padding: 5px;
  font-family: "SF Pro Text Light";
  font-size: 14px;
  box-shadow: 0px 2px 4px 0px #0000001a;
  border-radius: 30px;

  &:focus-visible {
    outline: 2px solid #008060;
  }
`;

export const VariantsContainer = styled.div`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  justify-content: flex-end;
  margin-top: 5px;
  grid-column: 4 / 6;
`;

export const VariantButton = styled.div`
  display: flex;
  text-transform: none;
  font-family: "SF Pro Text Light";
  font-size: 12px;
  cursor: pointer;

  span {
    margin-right: 2px;
    color: #006eff;
    text-decoration: underline;
    line-height: 21px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  img {
    cursor: pointer;
  }
`;
