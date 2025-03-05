import * as S from "./Button.styled";

const Button = ({
  children,
  size = "small",
  variant = "primary",
  ...props
}) => {
  return (
    <S.StyledButton variant={variant} size={size} {...props}>
      {children}
    </S.StyledButton>
  );
};

export default Button;
