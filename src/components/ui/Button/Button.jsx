import * as S from "./Button.styled";

const Button = ({ children, variant = "primary", ...props }) => {
  return (
    <S.StyledButton variant={variant} {...props}>
      {children}
    </S.StyledButton>
  );
};

export default Button;
