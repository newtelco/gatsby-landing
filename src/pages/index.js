import React from "react"
import styled from "styled-components"
import Layout from "../components/common/layout/layout"
import Apps from "../components/apps"
import Header from "../components/header"
import WeatherWidget from "../components/weather"
import TrelloWrapper from "../components/trello"

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url(/bg.svg);
  background-size: cover;
  opacity: 0.2;
  pointer-events: none;
`

const IndexPage = () => {
  return (
    <Layout>
      <Wrapper>
        <div
          style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Header />
          <WeatherWidget />
        </div>
        <Background />
        <Apps />
      </Wrapper>
      <TrelloWrapper />
    </Layout>
  )
}

export default IndexPage
