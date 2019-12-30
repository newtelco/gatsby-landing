import React from 'react'
import styled from 'styled-components'
import Ticker from 'react-ticker'
import { TrelloClient } from 'trello.ts'

const TrelloCard = styled.div`
  height: 20px;
  width: 200px;
  display: inline;
  color: rgba(255, 255, 255, 0.4);
  margin: 0px 150px;
  white-space: nowrap;
`

const TrelloLink = styled.a`
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  display: inline;
`

const TrelloLabel = styled.div`
  border: 1px solid #fff;
  color: #fff;
  background: ${props => props.color};
  height: 25px;
  width: 100px;
  opacity: 0.1;
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`

class CardsContainer extends React.Component {
  render () {
    if (this.props.cards.length > 0) {
      return (
        this.props.cards.map((card) => (
          <TrelloCard key={card.id}>
            <TrelloLink href={card.shortUrl} ref='noopener noreferer' target='_blank'>
              {card.name}
            </TrelloLink>
            {card.labelDetails && card.labelDetails.map(label => {
              return (
                <TrelloLabel key={label.id} color={label.color}>
                  {label.name}
                </TrelloLabel>
              )
            })}
          </TrelloCard>
        )
        )
      )
    } else {
      return null
    }
  }
}

class TrelloWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  componentDidMount () {
    if (this.state.cards.length === 0) this.fetchCards()
    if (this.state.cards.length !== 0) this.fetchLabels()
  }

  fetchCards () {
    const client = new TrelloClient({
      key: process.env.GATSBY_TRELLO_API,
      token: process.env.GATSBY_TRELLO_TOKEN,
      timeout: 1000
    })

    client.board
      .getCards({ id: '5c671254bcea64060f2d0161' }) // Board: Newtelco Technik
      .then(data => {
        const newCards = []
        data && data.forEach(card => {
          if (card.idList === '5c67128006d9580f33786ba8') { // List: To-Do
            newCards.push(card)
          }
        })
        this.setState({
          cards: newCards
        })
        client.board
          .getLabels({ id: '5c671254bcea64060f2d0161' }) // Board: Newtelco Technik
          .then(data2 => {
            newCards.forEach(card => {
              if (card.idLabels.length > 0) {
                card.labelDetails = []
                card.idLabels.forEach(labelId => {
                  const labelDetails = data2.filter(label => label.id === labelId)
                  card.labelDetails.push(labelDetails[0])
                })
              }
            })
          })
          .catch(e => {
            console.error(`Error Fetching Labels - ${e}`)
          })
      })
      .catch(e => {
        console.error(`Error Fetching Cards - ${e}`)
      })
  }

  render () {
    const {
      cards
    } = this.state

    if (cards.length > 0) {
      return (
        <Ticker mode='smooth' speed={5}>
          {(index) => (
            <CardsContainer cards={cards} />
          )}
        </Ticker>
      )
    } else {
      return null
    }
  }
}

export default TrelloWrapper
