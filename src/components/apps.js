import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import CategoryPanel from './panels/categorypanel'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 90vh;
`

const getAppJson = (data) => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach(item => {
    appJsonArray.push(
      <CategoryPanel
        label={item.node.category}
        key={item.node.category}
        apps={item.node.apps}
      />
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
          <ul>{getAppJson(data)}</ul>
        </Wrapper>
      )
    }}
  />
)

export default Apps
