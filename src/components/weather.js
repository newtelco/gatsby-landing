import React from 'react'
import styled from 'styled-components'
import ReactAnimatedWeather from 'react-animated-weather'

const Wrapper = styled.div`
  max-width: 500px;
  height: 500px;
  background-color: transparent;
  display: inline-block;
  margin: 20px;
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
  padding: 20px;
  width: 60px;

  font-size: 1.2rem;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: 300;
`

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
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
      size: 64,
      animate: true
    }

    const weatherStyle = {
      marginTop: '10px',
      marginBottom: '10px'
    }
    console.log(current)
    return (
      <Wrapper>
        <CurrentWrapper>
          <div
            style={{
              width: '32px',
              height: '32px'
            }}
          >
            <ReactAnimatedWeather
              icon={current.icon.toUpperCase()}
              color={defaults.color}
              size={32}
              animate={defaults.animate}
            />
          </div>
          <CurrentTempWrapper>
            {current.apparentTemperature.toString().substr(0, current.apparentTemperature.toString().length - 1)}°
          </CurrentTempWrapper>
          <div
            style={{
              color: '#fff'
            }}
          >
            {current.summary}
          </div>
        </CurrentWrapper>
        <ForecastWrapper>
          {Array.isArray(forecast) && forecast.map((day, index) => {
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
                    {day.apparentTemperatureHigh.toString().substr(0, day.apparentTemperatureHigh.toString().length - 1)}°
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
