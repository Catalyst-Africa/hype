import styled, { css } from "styled-components";

const SelectInputGroup = ({
  children,
  startIcon,
  endIcon,
  containerClass,
  helperText,
  helperTextType,
  label,
  className,
  disabled = false,
  width = "90%",
  ...props
}) => {
  return (
    <div style={{ width: width }}>
      {label && <Label>{label}</Label>}
      <InputContainer $type={helperTextType} $disabled={disabled}>
        {startIcon && startIcon}
        <select {...props} readOnly={disabled ? true : false}>
          {children}
        </select>
        {endIcon && endIcon}
      </InputContainer>
      {helperText && (
        <HelperText $type={helperTextType}>{helperText}</HelperText>
      )}
    </div>
  );
};

export default SelectInputGroup;

const InputContainer = styled.div`
  width: 100%;
  min-height: 35px;
  background: ${({ $disabled }) =>
    $disabled ? "rgba(212, 212, 212, 1)" : "transparent"};
  border: 1px solid
    ${({ $disabled }) => ($disabled ? "none" : "rgba(212, 212, 212, 1)")};
  border-radius: 8px;
  outline: none;
  padding: 0px 12px;
  gap: 12px;
  font-size: 12px;
  display: flex;
  align-items: center;

  ${({ $type }) => {
    switch ($type) {
      case "error":
        return css`
          border: 1px solid ${({ theme }) => theme.color.error};
        `;
      case "success":
        return css`
          border: 1px solid ${({ theme }) => theme.color.success};
        `;
      default:
        break;
    }
  }}

  &:focus,
  &:active,
  &:hover {
    border: 1px solid rgba(36, 24, 24, 0.8);

    ${({ $type }) => {
      switch ($type) {
        case "error":
          return css`
            border: 1px solid ${({ theme }) => theme.color.error};
          `;
        case "success":
          return css`
            border: 1px solid ${({ theme }) => theme.color.success};
          `;
        default:
          break;
      }
    }}
  }

  select {
    background: transparent;
    border: none;
    color: black;
    height: 100%;
    outline: none;
    width: 100%;
    display: flex;
    font-size: 14px;
  }

  span {
    color: black;
  }

  span:last-of-type {
    justify-self: flex-end;
  }
`;

const HelperText = styled.small`
  margin-top: 10px;
  display: inline-block;
  color: ${({ $type, theme }) =>
    $type === "error"
      ? theme.color.error
      : $type === "success"
      ? theme.color.success
      : "initial"};
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  display: inline-block;
`;
