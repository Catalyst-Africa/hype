import styled from "styled-components";

import { Logo } from "@/components/ui";

const Header = () => {
  return (
    <HeaderElement>
      <Logo />
    </HeaderElement>
  );
};

export default Header;

const HeaderElement = styled.header`
  width: 100%;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
`;
