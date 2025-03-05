import { useProductContext } from "../../../context/ProductContext";
import editIcon from "../../../assets/media/edit.svg";
import * as S from "./Input.styled";

const Input = ({
  value,
  handleOpen,
  index,
  hideButton,
  inputType = "square",
}) => {
  const { updateIndexOfContainer } = useProductContext();

  return (
    <S.InputContainer hideButton={hideButton} inputType={inputType}>
      <input type="text" value={value} placeholder="Select Product" disabled />
      {!hideButton && (
        <button>
          <img
            src={editIcon}
            alt="Edit"
            onClick={() => {
              updateIndexOfContainer(index);
              handleOpen();
            }}
          />
        </button>
      )}
    </S.InputContainer>
  );
};

export default Input;
