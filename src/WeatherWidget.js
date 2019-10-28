import React from 'react';
import cloud from './cloud.svg';
import './WeatherWidget.css';

class WeatherWidget extends React.Component {
  constructor() {
    super()
    this.state = {
      currentWeather: {},
      forecastToday: {},
      forecastTomorrow: {},
      forecastDayAfterTomorrow: {}
    }
  }

  componentDidMount(){

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/2c2ec5deca2e1c5eaf1df43ad3373a8c/${this.props.lat},${this.props.lng}`;

    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          currentWeather: data.currently,
          forecastToday: data.daily.data[0],
          forecastTomorrow: data.daily.data[1],
          forecastDayAfterTomorrow: data.daily.data[2]
        })
        console.log(this.state.currentWeather)
        console.log(this.state.forecastTomorrow)
    })
  }

  render(){
    const currentSummary = this.state.currentWeather.summary
    const currentTemperature = this.state.currentWeather.apparentTemperature

    const todaySummary = this.state.forecastToday.summary
    const todayTemperatureLow = this.state.forecastToday.apparentTemperatureLow
    const todayTemperatureHigh = this.state.forecastToday.apparentTemperatureHigh
    
    const tomorrowSummary = this.state.forecastTomorrow.summary
    const tomorrowTemperatureLow = this.state.forecastTomorrow.apparentTemperatureLow
    const tomorrowTemperatureHigh = this.state.forecastTomorrow.apparentTemperatureHigh
    
    const dayAfterTomorrowSummary = this.state.forecastDayAfterTomorrow.summary
    const dayAfterTomorrowTemperatureLow = this.state.forecastDayAfterTomorrow.apparentTemperatureLow
    const dayAfterTomorrowTemperatureHigh = this.state.forecastDayAfterTomorrow.apparentTemperatureHigh
    
    return (
      <div className="Weather-widget">
        
        <div className="Current-weather">
          <h1>Current Weather</h1>
          <img src={cloud} className="Widget-logo" alt="logo" />
          <h2>{Math.round(currentTemperature)}°F</h2>
          <h2>{currentSummary}</h2>
        </div>
        
        <div className="Weather-forecast">
        <h1>Weather Forecast</h1>
          <div>
            <img src={cloud} className="Widget-logo" alt="logo" />
            <p>{todaySummary}</p>
            <p>{Math.round(todayTemperatureLow)} - {Math.round(todayTemperatureHigh)}°F</p>
          </div>

          <div>
            <img src={cloud} className="Widget-logo" alt="logo" />
            <p>{tomorrowSummary}</p>
            <p>{Math.round(tomorrowTemperatureLow)} - {Math.round(tomorrowTemperatureHigh)}°F</p>
          </div>

          <div>
            <img src={cloud} className="Widget-logo" alt="logo" />
            <p>{dayAfterTomorrowSummary}</p>
            <p>{Math.round(dayAfterTomorrowTemperatureLow)} - {Math.round(dayAfterTomorrowTemperatureHigh)}°F</p>
          </div>
        </div>

      </div>
    );
  }
}

export default WeatherWidget;
