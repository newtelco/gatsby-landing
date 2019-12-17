import React from 'react'
import styled from 'styled-components'
import Logo from '../../src/images/nt-128.png'

const Wrapper = styled.div`
  display: flex;
  color: #fff;
  font-size: 1.2rem;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: 300;
`

// const TimeWrapper = styled.span`
//   font-size: 1.1rem;
//   font-family: 'Open Sans', Arial, Helvetica, sans-serif;
//   font-weight: 400;

//   height: 64px;
//   display: flex;
//   align-items: center;
// `

const Image = styled.img`
  padding: 20px;
  border: 5px solid #fff;
  border-radius: 0px 20px 20px 20px;
`

const Header = () => {
  return (
    <Wrapper>
      <Image src={Logo} height='128' width='128' alt='Logo' />
      {/* <TimeWrapper>
        {new Date().toLocaleTimeString('de-DE', { timeStyle: 'short' })}
      </TimeWrapper> */}
    </Wrapper>
  )
}

export default Header
