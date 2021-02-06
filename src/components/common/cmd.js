import React from "react"
import CommandPalette from "react-command-palette"
import Toggl from "../panels/toggl"
import Modal from "./modal"

function renderSuggestion(suggestion) {
  // const { id, color, name } = suggestion;
  const { name } = suggestion
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          color: "#fff",
          fontWeight: "300",
        }}
      >
        {name}
      </span>
      <span>
        {name.includes("Toggl") && (
          <span className="fa-layers fa-fw fa-lg">
            <svg
              height="24"
              width="24"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#C5000B"
                d="M8 0C3.582 0 0 3.58 0 8s3.582 8 8 8c4.42 0 8-3.58 8-8s-3.58-8-8-8zm0 12.103c-2.158 0-3.91-1.75-3.91-3.91 0-1.802 1.22-3.318 2.877-3.772v1.14C5.914 5.97 5.17 7 5.17 8.2c0 1.563 1.267 2.83 2.83 2.83 1.563 0 2.83-1.267 2.83-2.83 0-1.2-.744-2.223-1.796-2.636V4.42c1.657.455 2.876 1.97 2.876 3.773 0 2.16-1.75 3.91-3.91 3.91zm-.56-3.416h1.12V3.114H7.44v5.573z"
                fill-rule="evenodd"
              />
            </svg>
          </span>
        )}
        {name.includes("Trello") && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 7C6 6.44771 6.44772 6 7 6H10C10.5523 6 11 6.44772 11 7V17C11 17.5523 10.5523 18 10 18H7C6.44772 18 6 17.5523 6 17V7Z"
              fill="currentColor"
            />
            <path
              d="M13 7C13 6.44772 13.4477 6 14 6H17C17.5523 6 18 6.44772 18 7V13C18 13.5523 17.5523 14 17 14H14C13.4477 14 13 13.5523 13 13V7Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4ZM4 4H20V20H4V4Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </div>
  )
}

export default class Cmd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  togglStart = () => {
    const TOGGL_TOKEN = window.localStorage.getItem("TOGGL_TOKEN")
    if (!TOGGL_TOKEN) {
      this.setState({
        showModal: true,
      })
    }
    fetch(
      `https://nt-toggl.newtelco.workers.dev/?key=${TOGGL_TOKEN}&action=start`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Start R1", data)
      })
      .catch((err) => console.error(err))
  }

  togglEnd = () => {
    const TOGGL_TOKEN = window.localStorage.getItem("TOGGL_TOKEN")
    if (!TOGGL_TOKEN) {
      this.setState({
        showModal: true,
      })
    }
    fetch(
      `https://nt-toggl.newtelco.workers.dev/?key=${TOGGL_TOKEN}&action=stop`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Stop R1", data)
      })
      .catch((err) => console.error(err))
  }

  createTrelloCard = () => {
    const url =
      "https://trello.com/add-card?source=" +
      window.location.host +
      "&mode=popup&url=" +
      encodeURIComponent(window.location.href) +
      "&idList=5c67128006d9580f33786ba8&width=500,height=600,left=" +
      (window.screenX + (window.outerWidth - 500) / 2) +
      ",top=" +
      (window.screenY + (window.outerHeight - 740) / 2)
    window.open(url)
  }

  render() {
    const { showModal } = this.state

    return (
      <>
        {showModal && <Modal close={this.toggleModal} visible={showModal} />}
        {typeof window !== "undefined" && (
          <CommandPalette
            renderCommand={renderSuggestion}
            alwaysRenderCommands
            closeOnSelect
            commands={[
              {
                category: "Command",
                command: this.togglStart,
                id: 1,
                name: "Start Toggl Timer",
              },
              {
                category: "Command",
                command: this.togglEnd,
                id: 2,
                name: "Stop Toggl Timer",
              },
              {
                category: "Command",
                command: this.createTrelloCard,
                id: 3,
                name: "Create Trello Card",
              },
            ]}
            defaultInputValue=""
            display="modal"
            highlightFirstSuggestion
            maxDisplayed={7}
            onAfterOpen={function noRefCheck() {}}
            onChange={function noRefCheck() {}}
            onHighlight={function noRefCheck() {}}
            onRequestClose={function noRefCheck() {}}
            onSelect={function noRefCheck() {}}
            placeholder="Type a command"
            header={
              <div
                style={{
                  color: "rgb(172, 172, 172)",
                  display: "inline-flex",
                  alignItems: "space-between",
                  fontFamily: "arial",
                  fontSize: "12px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ paddingRight: "32px" }}>
                  Search for a command
                </span>
                <span>
                  <span style={{ paddingRight: "32px" }}>
                    <kbd
                      style={{
                        backgroundColor: "rgb(23, 23, 23)",
                        borderRadius: "4px",
                        color: "#b9b9b9",
                        fontSize: "12px",
                        marginRight: "6px",
                        padding: "2px 4px",
                      }}
                    >
                      ↑↓
                    </kbd>{" "}
                    to navigate
                  </span>
                  <span style={{ paddingRight: "32px" }}>
                    <kbd
                      style={{
                        backgroundColor: "rgb(23, 23, 23)",
                        borderRadius: "4px",
                        color: "#b9b9b9",
                        fontSize: "12px",
                        marginRight: "6px",
                        padding: "2px 4px",
                      }}
                    >
                      enter
                    </kbd>{" "}
                    to select
                  </span>
                  <span style={{ paddingRight: "32px" }}>
                    <kbd
                      style={{
                        backgroundColor: "rgb(23, 23, 23)",
                        borderRadius: "4px",
                        color: "#b9b9b9",
                        fontSize: "12px",
                        marginRight: "6px",
                        padding: "2px 4px",
                      }}
                    >
                      esc
                    </kbd>{" "}
                    to dismiss
                  </span>
                </span>
              </div>
            }
            reactModalParentSelector="body"
            resetInputOnClose
            showSpinnerOnSelect
            theme={{
              container: "atom-container",
              containerOpen: "atom-containerOpen",
              content: "atom-content",
              header: "atom-header",
              input: "atom-input",
              inputFocused: "atom-inputFocused",
              inputOpen: "atom-inputOpen",
              modal: "atom-modal",
              overlay: "atom-overlay",
              spinner: "atom-spinner",
              suggestion: "atom-suggestion",
              suggestionFirst: "atom-suggestionFirst",
              suggestionHighlighted: "atom-suggestionHighlighted",
              suggestionsContainer: "atom-suggestionsContainer",
              suggestionsContainerOpen: "atom-suggestionsContainerOpen",
              suggestionsList: "atom-suggestionsList",
              trigger: "atom-trigger",
            }}
            trigger={<Toggl />}
          />
        )}
      </>
    )
  }
}
