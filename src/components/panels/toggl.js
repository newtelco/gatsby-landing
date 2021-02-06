import React from "react"
import { Tab } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import "../style/react-tabs-newtelco.css"

class Toggl extends React.Component {
  render() {
    return (
      <Tab key="Toggl" data-tip="Cmd" data-effect="solid" data-type="dark">
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
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </Tab>
    )
  }
}

export default Toggl
