import React from "react"
import styled from "styled-components"
import Logo from "../../src/images/header_icon.png"

const Wrapper = styled.div`
  display: flex;
  color: #fff;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const Image = styled.img`
  padding: 20px;
  border-radius: 0px 20px 20px 20px;
  margin: 30px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(171, 176, 247, 0.1);
  backdrop-filter: blur(1px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 250ms ease-in-out;

  &:hover {
    transform: rotate(-10deg);
  }
`

const Header = () => {
  return (
    <Wrapper>
      <Image src={Logo} height="128" width="128" alt="Logo" />
    </Wrapper>
  )
}

export default Header
