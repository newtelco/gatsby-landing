import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  padding: 5px;
  background: rgba(0,0,0,0.1);
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  display: inline-block;
  transition: all 150ms linear;

  &:hover {
    transform: translateY(-5px);
  }
`

const AppPanel = (props) => {
  return (
    <Link target='_blank' href={props.app.url}>
      <Wrapper>
        {props.app.name}
      </Wrapper>
    </Link>
  )
}

export default AppPanel
