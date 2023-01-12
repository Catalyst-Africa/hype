import styled, { css } from "styled-components";

export const Container = styled.section`
  width: 100%;
  max-width: 1440px;
  padding: 24px;
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
`;
