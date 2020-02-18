import React from 'react'
import CommandPalette from 'react-command-palette'
import Toggl from '../panels/toggl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import Modal from './modal'

function renderSuggestion(suggestion) {
  const { id, color, name } = suggestion;
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      <span
        style={{
          color: '#fff',
          fontWeight: '300'
        }}
      >{name}</span>
      <span>
        {name.includes('Toggl') && (
          <span className="fa-layers fa-fw fa-lg">
            <FontAwesomeIcon icon={faCircle} color='red' />
            <FontAwesomeIcon icon={faPowerOff} transform="shrink-7" color='white' />
          </span>
        )}
        {name.includes('Trello') && (
          <span>
            <FontAwesomeIcon icon={faTrello} color='white' size='lg' />
          </span>
        )}
      </span>
    </div>
  );
}


export default class Cmd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  togglStart = () => {
    const TOGGL_TOKEN = window.localStorage.getItem('TOGGL_TOKEN')
    if (!TOGGL_TOKEN) {
      this.setState({
        showModal: true
      })
    }
    fetch(`https://nt-toggl.newtelco.workers.dev/?key=${TOGGL_TOKEN}&action=start`)
      .then(resp => resp.json())
      .then(data => {
        console.log('Start R1', data)
      })
      .catch(err => console.error(err))
  }

  togglEnd = () => {
    const TOGGL_TOKEN = window.localStorage.getItem('TOGGL_TOKEN')
    if (!TOGGL_TOKEN) {
      this.setState({
        showModal: true
      })
    }
    fetch(`https://nt-toggl.newtelco.workers.dev/?key=${TOGGL_TOKEN}&action=stop`)
      .then(resp => resp.json())
      .then(data => {
        console.log('Stop R1', data)
      })
      .catch(err => console.error(err))
  }

  createTrelloCard = () => {
    const url = 'https://trello.com/add-card' + '?source=' + window.location.host + '&mode=popup' + '&url=' + encodeURIComponent(window.location.href) + '&idList=5c67128006d9580f33786ba8' + '&width=500,height=600,left=' + (window.screenX + (window.outerWidth - 500) / 2) + ',top=' + (window.screenY + (window.outerHeight - 740) / 2)
    window.open(url)
  }

  render() {
    const {
      showModal
    } = this.state

    return (
      <>
        {showModal && <Modal close={this.toggleModal} visible={showModal} />}
        <CommandPalette
          renderCommand={renderSuggestion}
          alwaysRenderCommands
          closeOnSelect
          commands={[
            {
              category: 'Command',
              command: this.togglStart,
              id: 1,
              name: 'Start Toggl Timer'
            },
            {
              category: 'Command',
              command: this.togglEnd,
              id: 2,
              name: 'Stop Toggl Timer',
            },
            {
              category: 'Command',
              command: this.createTrelloCard,
              id: 3,
              name: 'Create Trello Card',
            }
          ]}
          defaultInputValue=''
          display='modal'
          highlightFirstSuggestion
          maxDisplayed={7}
          onAfterOpen={function noRefCheck() { }}
          onChange={function noRefCheck() { }}
          onHighlight={function noRefCheck() { }}
          onRequestClose={function noRefCheck() { }}
          onSelect={function noRefCheck() { }}
          placeholder='Type a command'
          header={
            <div
              style={{
                color: 'rgb(172, 172, 172)',
                display: 'inline-flex',
                alignItems: 'space-between',
                fontFamily: 'arial',
                fontSize: '12px',
                marginBottom: '12px'
              }}
            >
              <span style={{ paddingRight: '32px' }}>Search for a command</span>
              <span>
                <span style={{ paddingRight: '32px' }}>
                  <kbd
                    style={{
                      backgroundColor: 'rgb(23, 23, 23)',
                      borderRadius: '4px',
                      color: '#b9b9b9',
                      fontSize: '12px',
                      marginRight: '6px',
                      padding: '2px 4px'
                    }}
                  >
                    ↑↓
                </kbd>{' '}
                  to navigate
              </span>
                <span style={{ paddingRight: '32px' }}>
                  <kbd
                    style={{
                      backgroundColor: 'rgb(23, 23, 23)',
                      borderRadius: '4px',
                      color: '#b9b9b9',
                      fontSize: '12px',
                      marginRight: '6px',
                      padding: '2px 4px'
                    }}
                  >
                    enter
                </kbd>{' '}
                  to select
              </span>
                <span style={{ paddingRight: '32px' }}>
                  <kbd
                    style={{
                      backgroundColor: 'rgb(23, 23, 23)',
                      borderRadius: '4px',
                      color: '#b9b9b9',
                      fontSize: '12px',
                      marginRight: '6px',
                      padding: '2px 4px'
                    }}
                  >
                    esc
                </kbd>{' '}
                  to dismiss
              </span>
              </span>
            </div>
          }
          reactModalParentSelector='body'
          resetInputOnClose
          showSpinnerOnSelect
          theme={{
            container: 'atom-container',
            containerOpen: 'atom-containerOpen',
            content: 'atom-content',
            header: 'atom-header',
            input: 'atom-input',
            inputFocused: 'atom-inputFocused',
            inputOpen: 'atom-inputOpen',
            modal: 'atom-modal',
            overlay: 'atom-overlay',
            spinner: 'atom-spinner',
            suggestion: 'atom-suggestion',
            suggestionFirst: 'atom-suggestionFirst',
            suggestionHighlighted: 'atom-suggestionHighlighted',
            suggestionsContainer: 'atom-suggestionsContainer',
            suggestionsContainerOpen: 'atom-suggestionsContainerOpen',
            suggestionsList: 'atom-suggestionsList',
            trigger: 'atom-trigger'
          }}
          trigger={<Toggl />}
        />
      </>
    )
  }
}
