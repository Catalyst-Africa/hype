import styled from "styled-components";

import hypeLogo from "@/assets/hype.svg";

const Logo = () => {
  return <Image src={hypeLogo} alt="Hype!'s logo" />;
};

export default Logo;

const Image = styled.img`
  width: 90px;
`;
