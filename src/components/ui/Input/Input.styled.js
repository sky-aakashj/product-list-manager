import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  border: 1px solid #00000012;
  width: ${(props) => (props.hideButton ? "184px" : "215px")};
  height: ${(props) => (props.hideButton ? "31px" : "32px")};
  box-shadow: 0px 2px 4px 0px #0000001a;
  background: #ffffff;
  border-radius: ${(props) => (props.inputType === "circular" ? "30px" : "0")};

  /* Style for the input inside the container */
  input {
    font-family: "SF Pro Text Light";
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: left;
    padding: 0px;
    padding-left: ${(props) => (props.hideButton ? "15px" : "10px")};
    height: ${(props) => (props.hideButton ? "31px" : "32px")};
    width: ${(props) => (props.hideButton ? "164px" : "auto")};
    border: none;
    border-radius: ${(props) => (props.hideButton ? "30px" : "4px")};

    &:focus-visible {
      outline: none;
    }

    &:disabled {
      background-color: #ffffff;
    }
  }

  /* Style for the button inside the container */
  button {
    border: none;
    background: #ffffff;
    padding: 0px;
  }

  /* Style for the img inside the container */
  img {
    vertical-align: middle;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;
