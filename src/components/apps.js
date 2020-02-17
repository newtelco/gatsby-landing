import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import AppPanel from './panels/app-panel'
import Cmd from './common/cmd'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './style/react-tabs-newtelco.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrochip,
  faBriefcase,
  faCalculator
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

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
  @media (max-width: 768px) {
    min-width: unset;
  }
  @media (max-height: 768px) {
    height: 65vh;
    margin: 15px;
    margin-top: -5%;
  }
`

const AppWrapper = styled.div`
  display: inline-block;
`

const getIcon = category => {
  switch (category) {
    case 'Technik':
      return <FontAwesomeIcon icon={faMicrochip} size='2x' />
    case 'Order':
      return <FontAwesomeIcon icon={faCalculator} size='2x' />
    case 'General':
      return <FontAwesomeIcon icon={faBriefcase} size='2x' />
    default:
      return <FontAwesomeIcon icon={faBriefcase} />
  }
}

const getCategoryLabels = data => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach(item => {
    appJsonArray.push(
      <Tab key={item.node.category}>
        <Tooltip
          title={item.node.category}
          position='top'
          trigger='mouseenter focus click'
          animation='perspective'
          transitionFlip
          distance={55}
          delay={5}
          hideDelay={20}
          theme='transparent'
        >
          {getIcon(item.node.category)}
        </Tooltip>
      </Tab>
    )
  })
  if (typeof window !== 'undefined') {
    appJsonArray.push(
      <Cmd />
    )
  }
  return appJsonArray
}

const getCategoryApps = data => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach(item => {
    appJsonArray.push(
      <TabPanel>
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
              apps {
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
          <Tabs style={tabsStyle} defaultIndex={0}>
            <TabList>{getCategoryLabels(data)}</TabList>
            {getCategoryApps(data)}
          </Tabs>
        </Wrapper>
      )
    }}
  />
)

export default Apps
