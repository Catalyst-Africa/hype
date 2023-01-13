import styled, { css } from "styled-components";

export const Container = styled.section`
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? "100%" : "1440px")};
  padding: 24px;
  margin: auto;
`;

export const Title = styled.h1`
  color: ${({ color }) => (color ? color : "black")};

  ${({ as }) => {
    switch (as) {
      case "h2":
        return css`
          font-size: 40px;
          line-height: 50px;
          font-weight: 700;

          ${({ theme }) => theme.breakpoints.down("sm")} {
            font-size: 36px;
            line-height: 46px;
          }
        `;
      case "h3":
        return css`
          font-size: 32px;
          line-height: 40px;
          font-weight: 700;

          ${({ theme }) => theme.breakpoints.down("sm")} {
            font-size: 28px;
            line-height: 40px;
          }
        `;
      case "h4":
        return css`
          font-size: 24px;
          line-height: 30px;
          font-weight: 500;

          ${({ theme }) => theme.breakpoints.down("sm")} {
            font-size: 22px;
            line-height: 28px;
          }
        `;
      case "h5":
        return css`
          font-size: 20px;
          line-height: 25px;
          font-weight: 500;

          ${({ theme }) => theme.breakpoints.down("sm")} {
            font-size: 18px;
            line-height: 23px;
          }
        `;
      default:
        return css`
          font-size: 48px;
          line-height: 60px;
          ${({ theme }) => theme.breakpoints.down("sm")} {
            font-size: 42px;
            line-height: 56px;
          }
        `;
    }
  }}
`;

export const SubTitle = styled.h6`
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 16px;
    line-height: 20px;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  padding: 0px 8px;
  min-width: 100px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : null)};
  min-height: 40px;
  font-size: 14px;
  font-weight: 700;
  transition: ease-in 0.3s;

  ${({ $elevated }) =>
    $elevated &&
    "box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)"}

  ${({ $type }) => {
    switch ($type) {
      case "text":
        return css``;
      case "outlined":
        return css`
          color: ${({ theme, disabled }) =>
            disabled ? "rgba(28, 27, 31, 0.38)" : theme.color.main.default};
          border: 1px solid
            ${({ theme, disabled }) =>
              disabled ? "#CAC4D0" : theme.color.main.default};

          &:hover,
          &:active,
          &:focus {
            background: ${({ theme, disabled }) =>
              disabled ? "none" : theme.color.main["50"]};
          }
        `;
      default:
        return css`
          background: ${({ theme, disabled }) =>
            disabled ? "rgba(28, 27, 31, 0.12)" : theme.color.main.default};
          color: ${({ disabled }) =>
            disabled ? "rgba(28, 27, 31, 0.38)" : "#fff"};

          &:hover {
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
              0px 1px 3px 1px rgba(0, 0, 0, 0.15);
          }
          &:active {
            background: ${({ theme, disabled }) =>
              disabled ? "rgba(28, 27, 31, 0.12)" : theme.color.main["200"]};
          }
        `;
    }
  }}
`;

// Resizes based on device scrren size, very fluid

export const FluidTitle = styled.h1`
  color: ${({ color }) => (color ? color : "black")};
  font-size: 4.8vw;
  font-weight: ${({ $weight }) => ($weight ? $weight : "700")};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    font-size: ${(props) => (props.$size ? props.$size : "24px")};
  }
`;
