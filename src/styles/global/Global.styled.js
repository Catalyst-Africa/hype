import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    *, *::before, *::after {
        font-family: 'Satoshi', sans-serif;
        position: relative;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    } 

    body {
        color: #393939;
    }

    a {
        color: initial;
        text-decoration: initial;
    }

    ul, ol {
        list-style-type: none;
    }

    p {
        font-size: 18px;
        line-height: 27px;

        ${({ theme }) => theme.breakpoints.down("sm")} {
            font-size: 16px;
            line-height: 24px;
        }
    }

    span {
        font-size: 14px;
        line-height: 21px;
    }

    small {
        font-size: 12px;
        line-height: 18px;
    }

`;

export default GlobalStyles;
