import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import CategoryPanel from './panels/categorypanel'

const getAppJson = (data) => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach(item => {
    appJsonArray.push(
      <CategoryPanel key={item.node.category} apps={item.node.apps}>
        {item.node.category}
      </CategoryPanel>
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
      console.log(data)
      return (
        <>
          <ul>{getAppJson(data)}</ul>
        </>
      )
    }}
  />
)

export default Apps
