import React from 'react'
import styled from 'styled-components'
import { TrelloClient } from 'trello.ts'
import Marquee from 'react-double-marquee'

const TrelloCard = styled.div`
  height: 20px;
  width: 200px;
  display: inline;
  color: rgba(255, 255, 255, 0.4);
  margin: 0px 110px;
  white-space: nowrap;
  border: 3px dashed rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 10px;
`

const TrelloLink = styled.a`
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  display: inline;
`

const TrelloLabel = styled.div`
  color: #fff;
  background: ${props => props.color};
  height: 25px;
  width: 100px;
  opacity: 0.2;
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`

const TrelloPlaceholder = styled.div`
  visibility: hidden;
  height: 20px;
  width: 200px;
`

class CardsContainer extends React.Component {
  render () {
    if (this.props.cards.length > 0) {
      return (
        this.props.cards.map((card) => (
          <TrelloLink key={card.id} href={card.shortUrl} ref='noopener noreferer' target='_blank'>
            <TrelloCard>
              {card.name}
              {card.labels && card.labels.map(label => {
                return (
                  <TrelloLabel key={label.id} color={label.color}>
                    {label.name}
                  </TrelloLabel>
                )
              })}
            </TrelloCard>
          </TrelloLink>
        )
        )
      )
    } else {
      return (
        <TrelloPlaceholder />
      )
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
        <div
          style={{
            width: '100%',
            height: '40px',
            whiteSpace: 'nowrap',
            position: 'absolute',
            bottom: '30px'
          }}
          className='marquee-wrapper'
        >
          <Marquee delay={1000} speed={-0.03}>
            <CardsContainer cards={cards} />
          </Marquee>
        </div>
      )
    } else {
      return null
    }
  }
}

export default TrelloWrapper
