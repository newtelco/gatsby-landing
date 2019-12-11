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
`

const Label = styled.div`
  font-size: 22px;
  color: #eee;
  display: inline-block;
`

const CategoryPanel = (props) => {
  return (
    <Wrapper>
      <Label>{props.label}</Label>
      {props.apps.map((app, index) => {
        return <AppPanel key={app.name} app={app} />
      })}
    </Wrapper>
  )
}

export default CategoryPanel
