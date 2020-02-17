import React from "react"
// import styled from 'styled-components'
import { Tab } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import "../style/react-tabs-newtelco.css"
import { Tooltip } from "react-tippy"
import "react-tippy/dist/tippy.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons"
import Cmd from "../common/cmd"

class Toggl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCmd: false,
    }
  }

  toggleCommandPalette = () => {
    this.setState({
      showCmd: !this.state.showCmd,
    })
  }

  render() {
    const { showCmd } = this.state

    return (
      <Tab onClick={this.toggleCommandPalette} key="Toggl">
        <Tooltip
          title="Toggl"
          position="top"
          trigger="mouseenter focus click"
          animation="perspective"
          transitionFlip
          distance={55}
          delay={5}
          hideDelay={20}
          theme="transparent"
        >
          <FontAwesomeIcon icon={faBusinessTime} size="2x" />
        </Tooltip>
        <Cmd show={showCmd} />
      </Tab>
    )
  }
}

export default Toggl
