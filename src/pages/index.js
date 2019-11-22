import React from "react"
import styled from 'styled-components'
import Layout from "../components/common/layout/layout"
import Apps from '../components/apps'
import WeatherWidget from '../components/weather'

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
`

const IndexPage = () => {
  return (
    <Layout>
      <Wrapper>
        <WeatherWidget />
        <Apps />
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
