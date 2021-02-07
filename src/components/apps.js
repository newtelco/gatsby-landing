import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import { GlobalHotKeys } from "react-hotkeys"
import styled from "styled-components"
import AppPanel from "./panels/app-panel"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import "./style/react-tabs-newtelco.css"
import Loadable from "@loadable/component"

const Tooltip = Loadable(() => import("./common/tooltip"))
const CmdPalette = Loadable(() => import("./common/cmd"))

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
    height: calc(100vw / 2 - 100px);
    width: calc(100vw / 2 - 100px);
    font-size: 0.9rem;
  }
`

const getIcon = (category) => {
  switch (category) {
    case "Technik":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      )
    case "Order":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      )
    case "General":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      )

    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      )
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
        data-background-color="#0c090d"
        data-border={true}
        data-border-color="#67B2464e"
        data-effect="solid"
      >
        {getIcon(item.node.category)}
      </Tab>
    )
  })
  appJsonArray.push(<CmdPalette />)
  return appJsonArray
}

const getCategoryApps = (data) => {
  const appJsonArray = []
  data.allAppsJson.edges.forEach((item) => {
    appJsonArray.push(
      <TabPanel key={item.node.category}>
        {item.node.apps.map((app) => (
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
  position: "absolute",
  top: "0",
}

const Apps = () => {
  const [index, setIndex] = useState(0)
  const keyMap = {
    INDEX1: "1",
    INDEX2: "2",
    INDEX3: "3",
  }
  const handlers = {
    INDEX1: () => setIndex(0),
    INDEX2: () => setIndex(1),
    INDEX3: () => setIndex(2),
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
      render={(data) => {
        return (
          <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
            <Wrapper>
              <Tabs
                style={tabsStyle}
                onSelect={(tabIndex) => setIndex(tabIndex)}
                selectedIndex={index}
              >
                <TabList>{getCategoryLabels(data)}</TabList>
                {getCategoryApps(data)}
              </Tabs>
            </Wrapper>
            <Tooltip />
          </GlobalHotKeys>
        )
      }}
    />
  )
}

export default Apps
