import React, { useState } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { GlobalHotKeys } from 'react-hotkeys'
import styled from 'styled-components'
import AppPanel from './panels/app-panel'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './style/react-tabs-newtelco.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrochip,
  faBriefcase,
  faCalculator
} from '@fortawesome/free-solid-svg-icons'
// import Tooltip from './common/tooltip'

const Tooltip = React.lazy(() =>
  import('./common/tooltip')
)
const clientSideCmd = React.lazy(() =>
  import('./common/cmd')
)
const isSSR = typeof window === 'undefined'

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
    width: 100%;
    height: 100vh;
    margin: 15px;
    margin-top: -5%;
  }
`

const AppWrapper = styled.div`
  display: inline-block;
  @media (max-width: 768px) {
    margin: 10px;
    height: calc( 100vw / 2 - 100px );
    width: calc( 100vw / 2 - 100px );
    font-size: 0.9rem;
  }
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

const getCategoryLabels = (data) => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach((item, index) => {
    appJsonArray.push(
      <Tab
        index={index}
        key={item.node.category}
        data-tip={item.node.category}
        data-effect='solid'
        data-type='dark'
      >
        {getIcon(item.node.category)}
      </Tab>
    )
  })
  if (!isSSR && window.innerWidth > 768) {
    appJsonArray.push(
      <React.Suspense fallback={<div />}>
        <clientSideCmd />
      </React.Suspense>
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

const Apps = () => {
  const [index, setIndex] = useState(0)
  const keyMap = {
    INDEX1: '1',
    INDEX2: '2',
    INDEX3: '3'
  }
  const handlers = {
    INDEX1: () => setIndex(0),
    INDEX2: () => setIndex(1),
    INDEX3: () => setIndex(2)
  }

  return (
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
          <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
            <Wrapper>
              <Tabs style={tabsStyle} defaultIndex={0} onSelect={tabIndex => setIndex(tabIndex)} selectedIndex={index}>
                <TabList>{getCategoryLabels(data)}</TabList>
                {getCategoryApps(data)}
              </Tabs>
            </Wrapper>
            <React.Suspense fallback={<div />}>
              <Tooltip />
            </React.Suspense>
          </GlobalHotKeys>
        )
      }}
    />
  )
}

export default Apps
