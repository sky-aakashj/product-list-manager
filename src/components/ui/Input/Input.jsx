import editIcon from "../../../assets/media/edit.svg";
import * as S from "./Input.styled";

const Input = ({ value, handleOpen }) => {
  return (
    <S.InputContainer>
      <input type="text" value={value} placeholder="Select Product" disabled />
      <button>
        <img src={editIcon} onClick={handleOpen} alt="Edit" />
      </button>
    </S.InputContainer>
  );
};

export default Input;
