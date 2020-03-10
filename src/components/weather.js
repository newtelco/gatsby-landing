import React from 'react'
import styled from 'styled-components'
import ReactAnimatedWeather from 'react-animated-weather'

const Wrapper = styled.div`
  background-color: transparent;
  display: inline-block;
  margin: 20px;
  align-self: flex-end;
  min-width: 420px;
  @media (max-width: 768px) {
    min-width: unset;
    width: 85%;
  }
`

const ForecastWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 450px;
  color: #fff;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const DateTempWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  width: 60px;

  font-size: 1.2rem;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: 300;

  @media (max-width: 768px) {
    padding: 5px;
    width: 35px;
  }
`

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  @media (max-width: 768px) {
    margin: 15px;
    font-size: 1rem;
  }
`

const CurrentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CurrentTempWrapper = styled.div`
  font-size: 4rem;
  color: #fff;
`

class WeatherWidget extends React.Component {
  constructor (props) {
    super(props)
    this.iconRefs = []
    this.state = {
      forecast: '',
      current: {
        icon: 'CLEAR_DAY',
        apparentTemperature: 0.0,
        summary: ''
      }
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
      color: 'white',
      size: 48,
      animate: true
    }

    const weatherStyle = {
      marginTop: '10px',
      marginBottom: '10px'
    }

    let currentTemp = current.apparentTemperature.toString()
    if (currentTemp.length > 3) {
      currentTemp = current.apparentTemperature.toString().substr(0, current.apparentTemperature.toString().length - 1)
    }

    return (
      <Wrapper>
        <CurrentWrapper>
          <CurrentTempWrapper>
            {currentTemp}°
          </CurrentTempWrapper>
          <span style={{ position: 'relative' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                display: 'inline'
              }}
            >
              <ReactAnimatedWeather
                icon={current.icon.toUpperCase().replace(/-/g, '_')}
                color={defaults.color}
                size={32}
                animate={defaults.animate}
              />
            </div>
            <div
              style={{
                color: '#fff',
                display: 'inline',
                height: '35px',
                position: 'absolute',
                bottom: '-7px',
                left: '40px'
              }}
            >
              {current.summary}
            </div>
          </span>
        </CurrentWrapper>
        <ForecastWrapper>
          {Array.isArray(forecast) && forecast.map((day, index) => {
            let dayTemp = day.apparentTemperatureHigh.toString()
            if (dayTemp.length > 3 && dayTemp.charAt(dayTemp.length - 2) !== '.') {
              dayTemp = dayTemp.substr(0, dayTemp.length - 1)
            }
            return (
              <DayWrapper
                key={day.time}
              >
                <DateTempWrapper>
                  <div style={weatherStyle}>
                    {this.getDateTimeFromTimestamp(day.time * 1000).substr(0, 3)}
                  </div>
                  <ReactAnimatedWeather
                    icon={day.icon.toUpperCase().replace(/-/g, '_')}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                  />
                  <div style={weatherStyle}>
                    {dayTemp}°
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
