import React from 'react'
import styled from 'styled-components'
import ReactAnimatedWeather from 'react-animated-weather'

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
  color: #fff;
`

const DateTempWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  max-width: 50px;

  font-size: 1.8rem;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: 300;
`

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`

class WeatherWidget extends React.Component {
  constructor (props) {
    super(props)
    this.iconRefs = []
    this.state = {
      forecast: '',
      current: ''
    }
  }

  componentDidMount () {
    window.fetch('https://darksky.newtelco.workers.dev')
      .then(res => res.json())
      .then(data => {
        this.setState({
          forecast: data.forecast,
          current: data.current
        })
      })
      .catch(err => console.error(err))
  }

  getDateTimeFromTimestamp (unixTimeStamp) {
    const date = new Date(unixTimeStamp)
    const options = { weekday: 'long' }
    const day = new Intl.DateTimeFormat('en-US', options).format(date)
    return day
  }

  render () {
    const {
      forecast,
      current
    } = this.state

    const defaults = {
      icon: 'CLEAR_DAY',
      color: 'white',
      size: 128,
      animate: true
    }

    return (
      <Wrapper>
        <ForecastWrapper>
          {Array.isArray(forecast) && forecast.map((day, index) => {
            return (
              <DayWrapper
                key={day.time}
              >
                <ReactAnimatedWeather
                  icon={day.icon.toUpperCase()}
                  color={defaults.color}
                  size={defaults.size}
                  animate={defaults.animate}
                />
                <DateTempWrapper>
                  <div>
                    {this.getDateTimeFromTimestamp(day.time * 1000)}
                  </div>
                  <div>
                    {day.apparentTemperatureHigh}°
                  </div>
                </DateTempWrapper>
              </DayWrapper>
            )
          })}
        </ForecastWrapper>
      </Wrapper>
    )
  }
}

export default WeatherWidget
