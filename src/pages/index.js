import React from 'react'
import styled from 'styled-components'
import Layout from '../components/common/layout/layout'
import Apps from '../components/apps'
import Header from '../components/header'
import WeatherWidget from '../components/weather'
import Particles from 'react-particles-js'
import TrelloWrapper from '../components/trello'

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

const IndexPage = () => {
  return (
    <>
      <Particles
        style={{
          position: 'absolute'
        }}
      />
      <Layout>
        <Wrapper>
          <div
            style={{
              height: '90vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Header />
            <WeatherWidget />
          </div>
          <Apps />
        </Wrapper>
        <TrelloWrapper />
      </Layout>
    </>
  )
}

export default IndexPage
