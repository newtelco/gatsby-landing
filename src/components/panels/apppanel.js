import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 200px;
  height: 60px;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
`

const AppPanel = (props) => {
  return (
    <Wrapper>{props.children}</Wrapper>
  )
}

export default AppPanel
