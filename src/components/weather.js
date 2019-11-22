import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 500px;
  height: 500px;
  background-color: transparent;
  display: flex;
`

const ForecastWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 450px;
`

const TempWrapper = styled.span`
  padding: 5px;
`

const DateWrapper = styled.span`
  padding: 10px;
`

class WeatherWidget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      forecast: '',
      current: ''
    }
  }

  componentDidMount () {
    window.fetch('https://darksky.newtelco.workers.dev')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          forecast: data.forecast,
          current: data.current
        })
      })
      .catch(err => console.error(err))
  }

  getDateTimeFromTimestamp (unixTimeStamp) {
    var date = new Date(unixTimeStamp)
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getYear()
  }

  render () {
    const {
      forecast,
      current
    } = this.state

    return (
      <Wrapper>
        <ForecastWrapper>
          {Array.isArray(forecast) && forecast.map((day, index) => {
            return (
              <div
                key={day.time}
                style={{
                  margin: '10px'
                }}
              >
                <DateWrapper>
                  {this.getDateTimeFromTimestamp(day.time * 1000)}
                </DateWrapper>
                <div>
                  <TempWrapper>
                    {day.apparentTemperatureLow}
                  </TempWrapper>
                  <TempWrapper>
                    {day.apparentTemperatureHigh}
                  </TempWrapper>
                </div>
              </div>
            )
          })}
        </ForecastWrapper>
      </Wrapper>
    )
  }
}

export default WeatherWidget
