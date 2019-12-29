import React from 'react'
import styled from 'styled-components'
import Ticker from 'react-ticker'
import { TrelloClient } from 'trello.ts'

const TrelloCard = styled.div`
  height: 20px;
  white-space: nowrap;
  display: flex;
  color: #fff;
  margin: 0px 5px;
`

class TrelloWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  componentDidMount () {
    const client = new TrelloClient({
      key: process.env.TRELLO_API,
      token: process.env.TRELLO_TOKEN,
      timeout: 1000
    })

    client.board
      .getCards({ id: '5c671254bcea64060f2d0161' })
      .then(data => {
        console.log(data)
        this.setState({
          cards: data
        })
      })
      .catch(e => {
        throw e
      })
  }

  authFail (error) {
    console.error(`Auth Failed - ${error}`)
  }

  authSuccess (data) {
    console.log(`Success - ${data}`)
  }

  render () {
    const {
      cards
    } = this.state

    if (cards.length > 0) {
      return (
        <Ticker mode='smooth' offset='run-in' speed={10}>
          {() => cards.map((card) => {
            return (
              <TrelloCard key={card.id}>
                {card.name}
              </TrelloCard>
            )
          })}
        </Ticker>
      )
    } else {
      return null
    }
  }
}

export default TrelloWrapper
