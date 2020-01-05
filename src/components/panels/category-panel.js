import React from 'react'
import styled from 'styled-components'
import AppPanel from './apppanel'

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border:2px solid #fff;
`

const CategoryPanel = (props) => {
  return (
    <Wrapper>
      {props.apps.map(app => {
        return <AppPanel key={app.name} app={app} />
      })}
    </Wrapper>
  )
}

export default CategoryPanel
