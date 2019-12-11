import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import CategoryPanel from './panels/categorypanel'
import styled from 'styled-components'
import AppPanel from './panels/apppanel'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 90vh;
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
      <TabPanel>
        {item.node.apps.forEach(app => {
          console.log(app)
          return (
            <p>
              {app.name}
              <AppPanel key={app.name} app={app} />
            </p>
          )
        })}
      </TabPanel>
    )
  })
  return appJsonArray
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
          <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
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
