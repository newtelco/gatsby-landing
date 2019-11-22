import React from 'react'
import styled from 'styled-components'
const Skycons = require('skycons')(window)

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

const TempWrapper = styled.span`
  padding: 5px;
`

const DateWrapper = styled.span`
  padding: 10px;
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
        console.log(data)
        this.setState({
          forecast: data.forecast,
          current: data.current
        })
        // const skycons = new Skycons({ color: 'white' })
        data.forecast.forEach((day, index) => {
          this.renderIcons(day.icon, index)
          // const icon = day.icon.toUpperCase()
          // console.log(icon)
          // skycons.add(this.index.current, Skycons[icon])
        })
        // skycons.play()
      })
      .catch(err => console.error(err))
  }

  getDateTimeFromTimestamp (unixTimeStamp) {
    var date = new Date(unixTimeStamp)
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getYear()
  }

  renderIcons (icon, index) {
    if (!icon) {
      return (<h2>Loading...</h2>)
    }

    console.log(icon, index)
    const skycons = new Skycons({ color: 'white' })
    if (icon === 'wind') {
      skycons.set(this.iconRefs[index], Skycons.WIND)
      skycons.play()
    }
    if (icon === 'cloudy') {
      skycons.set(this.iconRefs[index], Skycons.CLOUDY)
      skycons.play()
    }
    if (icon === 'fog') {
      skycons.set(this.iconRefs[index], Skycons.FOG)
      skycons.play()
    }
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
            // const refName = `${ref}${index}`
            this.iconRefs[index] = React.createRef()
            // data.forecast.map((data, index) => {
            //   if (!(index in this.iconRefs)) {
            //     this.iconRefs[index] = {}
            //   }
            // })
            return (
              <div
                key={day.time}
                style={{
                  margin: '10px'
                }}
              >
                <canvas ref={this.iconRefs[index]} width='128' height='128' />
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
