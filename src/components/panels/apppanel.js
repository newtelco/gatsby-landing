import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 200px;
  height: 60px;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
  display: inline-block;
`

const Link = styled.a`
  text-decoration: none;
`

const AppPanel = (props) => {
  return (
    <Wrapper>
      <Link href={props.app.url}>
        {props.app.name}
      </Link>
    </Wrapper>
  )
}

export default AppPanel
