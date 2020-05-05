import React from 'react'
import { Tab } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import '../style/react-tabs-newtelco.css'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'

class Toggl extends React.Component {
  render () {
    return (
      <Tab key='Toggl'>
        <Tooltip
          title='Cmd'
          position='top'
          trigger='mouseenter focus click'
          animation='perspective'
          transitionFlip
          distance={55}
          delay={5}
          hideDelay={20}
          theme='transparent'
        >
          <FontAwesomeIcon icon={faTerminal} size='2x' />
        </Tooltip>
      </Tab>
    )
  }
}

export default Toggl
