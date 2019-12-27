import React from 'react'
import styled from 'styled-components'
import Logo from '../../src/images/nt-128.png'

const Wrapper = styled.div`
  display: flex;
  color: #fff;
  font-size: 1.2rem;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: 300;
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
