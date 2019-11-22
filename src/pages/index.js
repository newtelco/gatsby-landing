import React from "react"
import Layout from "../components/common/layout/layout"
import Container from '../components/common/layout/wrapper'
import Apps from '../components/apps'

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <Apps />
      </Container>
    </Layout>
  )
}

export default IndexPage
