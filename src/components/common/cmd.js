import React from 'react'
import CommandPalette from 'react-command-palette'

export default class Cmd extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const commands = [
      {
        name: 'Foo',
        foo() {
          window.alert('Foo!')
        }
      },
      {
        name: 'Bar',
        bar() {
          window.alert('Bar!')
        }
      }
    ]
    return (
      <CommandPalette
        open={this.props.show}
        alwaysRenderCommands
        closeOnSelect
        commands={[
          {
            category: 'Command',
            id: 1,
            name: 'Start All Data Imports'
          },
          {
            category: 'Command',
            command: function noRefCheck() { },
            id: 2,
            name: 'Stop All Data Imports'
          },
          {
            category: 'Command',
            command: function noRefCheck() { },
            id: 3,
            name: 'Delete All Tenant'
          },
          {
            category: 'Network',
            command: function noRefCheck() { },
            id: 4,
            name: 'Go offline',
            shortcut: '⌘ Esc'
          },
          {
            category: 'Network',
            command: function noRefCheck() { },
            id: 5,
            name: 'Go online'
          },
          {
            category: 'Navigate',
            command: function noRefCheck() { },
            id: 6,
            name: 'Jump to Tenant'
          },
          {
            category: 'Navigate',
            command: function noRefCheck() { },
            id: 7,
            name: 'View Logs '
          },
          {
            category: 'System',
            command: function noRefCheck() { },
            id: 8,
            name: 'Show Memory'
          },
          {
            category: 'System',
            command: function noRefCheck() { },
            id: 9,
            name: 'Show CPU'
          },
          {
            category: 'System',
            command: function noRefCheck() { },
            id: 10,
            name: 'Show Disk Usage'
          },
          {
            category: 'Command',
            command: function noRefCheck() { },
            id: 11,
            name: 'Export Tenant'
          },
          {
            category: 'Drawer',
            command: function noRefCheck() { },
            id: 12,
            name: 'Toggle drawer',
            shortcut: 'Esc'
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
        renderCommand={function noRefCheck() { }}
        resetInputOnClose={false}
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
        trigger={<div />}
      />
    )
  }
}
