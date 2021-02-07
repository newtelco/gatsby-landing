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
  /* border-radius: 0px 20px 20px 20px; */
  border-radius: 10px;
  margin: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 250ms ease-in-out;

  &::after {
    box-shadow: 0 8px 22px 0 rgba(255, 255, 255, 0.05);
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
  }
  &:hover::after {
    opacity: 0.7;
  }

  &:hover {
    transform: rotate(-10deg);
    backdrop-filter: blur(6px);
    border: 1px solid #67b2464e;
    box-shadow: 0 8px 32px 0 rgba(103, 178, 70, 0.1);
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
