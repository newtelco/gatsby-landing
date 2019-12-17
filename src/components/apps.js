import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import AppPanel from './panels/apppanel'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './style/react-tabs-newtelco.css'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 50px;
  width: 40vw;
  min-width: 515px;
  max-width: 525px;
  height: 80vh;
`

const AppWrapper = styled.div`
  display: inline-block;
`

const getCategoryLabels = (data) => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach(item => {
    appJsonArray.push(
      <Tab key={item.node.category}>
        {item.node.category}
      </Tab>
    )
  })
  return appJsonArray
}

const getCategoryApps = (data) => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach(item => {
    appJsonArray.push(
      <TabPanel key={item.category}>
        {item.node.apps.map(app => (
          <AppWrapper key={app.name}>
            <AppPanel app={app} />
          </AppWrapper>
        ))}
      </TabPanel>
    )
  })
  return appJsonArray
}

const tabsStyle = {
  position: 'absolute',
  top: '0'
}

const Apps = ({ children }) => (
  <StaticQuery
    query={graphql`
      query AppsQuery {
        allAppsJson {
          edges {
            node {
              category
              apps{
                name
                url
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Wrapper>
          <Tabs style={tabsStyle} defaultIndex={0} onSelect={index => console.log(index)}>
            <TabList>
              {getCategoryLabels(data)}
            </TabList>
            {getCategoryApps(data)}
          </Tabs>
        </Wrapper>
      )
    }}
  />
)

export default Apps
