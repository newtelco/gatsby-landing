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
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 22C9 22.5523 8.55228 23 8 23C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21C8.55228 21 9 21.4477 9 22ZM13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21C12.5523 21 13 21.4477 13 22ZM16 23C16.5523 23 17 22.5523 17 22C17 21.4477 16.5523 21 16 21C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 2C9 2.55228 8.55228 3 8 3C7.44772 3 7 2.55228 7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2ZM13 2C13 2.55228 12.5523 3 12 3C11.4477 3 11 2.55228 11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2ZM16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3ZM9 22C9 22.5523 8.55228 23 8 23C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21C8.55228 21 9 21.4477 9 22ZM13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21C12.5523 21 13 21.4477 13 22ZM16 23C16.5523 23 17 22.5523 17 22C17 21.4477 16.5523 21 16 21C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23ZM23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16C21 16.5523 21.4477 17 22 17C22.5523 17 23 16.5523 23 16ZM23 12C23 11.4477 22.5523 11 22 11C21.4477 11 21 11.4477 21 12C21 12.5523 21.4477 13 22 13C22.5523 13 23 12.5523 23 12ZM22 7C22.5523 7 23 7.44771 23 8C23 8.55229 22.5523 9 22 9C21.4477 9 21 8.55229 21 8C21 7.44771 21.4477 7 22 7ZM2 15C2.55228 15 3 15.4477 3 16C3 16.5523 2.55228 17 2 17C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15ZM2 11C2.55228 11 3 11.4477 3 12C3 12.5523 2.55228 13 2 13C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11ZM3 8C3 7.44771 2.55228 7 2 7C1.44772 7 1 7.44771 1 8C1 8.55229 1.44772 9 2 9C2.55228 9 3 8.55229 3 8ZM17 6H7C6.44772 6 6 6.44772 6 7V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V7C18 6.44772 17.5523 6 17 6ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7ZM14 10H10V14H14V10ZM8 8V16H16V8H8Z"
            fill="currentColor"
          />
        </svg>
      )
    case "Order":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17 5H7V7H17V5Z" fill="currentColor" />
          <path d="M7 9H9V11H7V9Z" fill="currentColor" />
          <path d="M9 13H7V15H9V13Z" fill="currentColor" />
          <path d="M7 17H9V19H7V17Z" fill="currentColor" />
          <path d="M13 9H11V11H13V9Z" fill="currentColor" />
          <path d="M11 13H13V15H11V13Z" fill="currentColor" />
          <path d="M13 17H11V19H13V17Z" fill="currentColor" />
          <path d="M15 9H17V11H15V9Z" fill="currentColor" />
          <path d="M17 13H15V19H17V13Z" fill="currentColor" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 3C3 1.89543 3.89543 1 5 1H19C20.1046 1 21 1.89543 21 3V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V3ZM5 3H19V21H5V3Z"
            fill="currentColor"
          />
        </svg>
      )
    case "General":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"
            fill="currentColor"
          />
        </svg>
      )

    default:
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"
            fill="currentColor"
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
        data-effect="solid"
        data-type="dark"
      >
        {getIcon(item.node.category)}
      </Tab>
    )
  })
  appJsonArray.push(
    <CmdPalette data-tip="Cmds" data-effect="solid" data-type="dark" />
  )
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
