import styled from "styled-components";

import Logo from "@/components/ui/Logo";

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
  padding: 8px 0;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
`;
