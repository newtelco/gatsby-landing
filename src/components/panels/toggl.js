import React from 'react'
import { Tab } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import '../style/react-tabs-newtelco.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'

class Toggl extends React.Component {
  render() {
    return (
      <Tab
        key='Toggl'
        data-tip='Cmd'
        data-effect='solid'
        data-type='dark'
      >
        <FontAwesomeIcon icon={faTerminal} size='2x' />
      </Tab>
    )
  }
}

export default Toggl
