import React from 'react'
import styled from 'styled-components'
import Logo from '../../src/images/header_icon.png'

const Wrapper = styled.div`
  display: flex;
  color: #fff;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const Image = styled.img`
  padding: 20px;
  border: 5px solid #fff;
  border-radius: 0px 20px 20px 20px;
  margin: 30px;
`

const Header = () => {
  return (
    <Wrapper>
      <Image src={Logo} height='128' width='128' alt='Logo' />
    </Wrapper>
  )
}

export default Header
