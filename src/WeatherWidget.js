import React from "react";
import WeatherLoader from "./Components/Loader";
import styled from "styled-components";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./WeatherWidget.css";

const UnitButton = styled.div`
  position: relative;
  left: 50px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.toggle ? "#ACA7CB" : "#474554")};
  border: 1px solid white;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
`;

class WeatherWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      currentWeather: {},
      forecastToday: {},
      forecastTomorrow: {},
      forecastDayAfterTomorrow: {},
      isLoading: true,
      fahrenheit: false
    };
  }

  componentDidMount() {
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
        });
        this.setState({
          isLoading: false
        });
      });
  }

  toCelcius(temp) {
    return Math.floor((temp - 32) * (5 / 9));
  }

  changeUnitTemp() {
    this.setState({
      fahrenheit: !this.state.fahrenheit
    });
  }

  getDate = timestamp => {
    const a = new Date(timestamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    const d = time.toString().split(" ");

    return `${d[0]}-${d[1]}`;
  };

  render() {
    const currentIcon = this.state.currentWeather.icon;
    const currentSummary = this.state.currentWeather.summary;
    const currentTemperature = this.state.currentWeather.apparentTemperature;

    const todayIcon = this.state.forecastToday.icon;
    const todayTemperatureLow = this.state.forecastToday.apparentTemperatureLow;
    const todayTemperatureHigh = this.state.forecastToday
      .apparentTemperatureHigh;
    const todaysDate = this.state.forecastToday.time;

    const tomorrowIcon = this.state.forecastTomorrow.icon;
    const tomorrowTemperatureLow = this.state.forecastTomorrow
      .apparentTemperatureLow;
    const tomorrowTemperatureHigh = this.state.forecastTomorrow
      .apparentTemperatureHigh;
    const tomorrowsDate = this.state.forecastTomorrow.time;

    const dayAfterTomorrowIcon = this.state.forecastDayAfterTomorrow.icon;
    const dayAfterTomorrowTemperatureLow = this.state.forecastDayAfterTomorrow
      .apparentTemperatureLow;
    const dayAfterTomorrowTemperatureHigh = this.state.forecastDayAfterTomorrow
      .apparentTemperatureHigh;
    const dayAfterTomorrowsDate = this.state.forecastDayAfterTomorrow.time;

    return (
      <div className='weather-widget'>
        {this.state.isLoading ? (
          <div className='center loader'>
            <WeatherLoader />
            <h3>Loading...</h3>
          </div>
        ) : (
          <div>
            <div className='top-grid'>
              <div className='center header'>
                <h1 className='position-header'>Current Weather</h1>
                <UnitButton
                  toggle={this.state.fahrenheit}
                  onClick={() => this.changeUnitTemp()}
                >
                  {this.state.fahrenheit ? "°C" : "°F"}
                </UnitButton>
              </div>

              <div className='center icon'>
                <img
                  src={`./icons/${currentIcon}.svg`}
                  className='widget-icon-big'
                  alt='weather-icon'
                />
              </div>
              <div className='center temp'>
                <h2>
                  {this.state.fahrenheit
                    ? `${Math.round(currentTemperature)}°F`
                    : `${this.toCelcius(currentTemperature)}°C`}
                </h2>
              </div>
              <div className='center summary'>
                <h2>{currentSummary}</h2>
              </div>
            </div>

            <div className='bottom-grid'>
              <div className='center bottom-header'>
                <h1>Weather Forecast</h1>
              </div>

              <div className='forecast forecast-today'>
                <div className='center date'>
                  <p>{this.getDate(todaysDate)}</p>
                </div>
                <div className='center small-icon'>
                  <img
                    src={`./icons/${todayIcon}.svg`}
                    className='widget-icon-small'
                    alt='weather-icon'
                  />
                </div>
                <div className='center small-temp'>
                  <p>
                    {this.state.fahrenheit
                      ? `${Math.round(todayTemperatureLow)}°F / ${Math.round(
                          todayTemperatureHigh
                        )}°F`
                      : `${this.toCelcius(
                          todayTemperatureLow
                        )}°C / ${this.toCelcius(todayTemperatureHigh)}°C`}
                  </p>
                </div>
              </div>

              <div className='forecast forecast-tomorrow'>
                <div className='center date'>
                  <p>{this.getDate(tomorrowsDate)}</p>
                </div>
                <div className='center small-icon'>
                  <img
                    src={`./icons/${tomorrowIcon}.svg`}
                    className='widget-icon-small'
                    alt='weather-icon'
                  />
                </div>
                <div className='center small-temp'>
                  <p>
                    {this.state.fahrenheit
                      ? `${Math.round(tomorrowTemperatureLow)}°F / ${Math.round(
                          tomorrowTemperatureHigh
                        )}°F`
                      : `${this.toCelcius(
                          tomorrowTemperatureLow
                        )}°C / ${this.toCelcius(tomorrowTemperatureHigh)}°C`}
                  </p>
                </div>
              </div>

              <div className='forecast forecast-day-after-tomorrow'>
                <div className='center date'>
                  <p>{this.getDate(dayAfterTomorrowsDate)}</p>
                </div>
                <div className='center small-icon'>
                  <img
                    src={`./icons/${dayAfterTomorrowIcon}.svg`}
                    className='widget-icon-small'
                    alt='weather-icon'
                  />
                </div>
                <div className='center small-temp'>
                  <p>
                    {this.state.fahrenheit
                      ? `${Math.round(
                          dayAfterTomorrowTemperatureLow
                        )}°F / ${Math.round(dayAfterTomorrowTemperatureHigh)}°F`
                      : `${this.toCelcius(
                          dayAfterTomorrowTemperatureLow
                        )}°C / ${this.toCelcius(
                          dayAfterTomorrowTemperatureHigh
                        )}°C`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherWidget;
