import React from "react";
import WeatherLoader from "./Components/Loader";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./WeatherWidget.css";
import "./layout.css";

class WeatherWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      currentWeather: {},
      forecastToday: {},
      forecastTomorrow: {},
      forecastDayAfterTomorrow: {},
      isLoading: true,
      temperature: false
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
        console.log(this.state.forecastToday);
        console.log(this.state.forecastTomorrow);
      });
  }

  toCelcius(temp) {
    return Math.floor((temp - 32) * (5 / 9));
  }

  changeTemp() {
    this.setState({
      temperature: !this.state.temperature
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

    const tomorrowIcon = this.state.forecastTomorrow.icon;
    const tomorrowTemperatureLow = this.state.forecastTomorrow
      .apparentTemperatureLow;
    const tomorrowTemperatureHigh = this.state.forecastTomorrow
      .apparentTemperatureHigh;

    const dayAfterTomorrowIcon = this.state.forecastDayAfterTomorrow.icon;
    const dayAfterTomorrowTemperatureLow = this.state.forecastDayAfterTomorrow
      .apparentTemperatureLow;
    const dayAfterTomorrowTemperatureHigh = this.state.forecastDayAfterTomorrow
      .apparentTemperatureHigh;

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
                <h1>Current Weather</h1>
                <div className='temp-button' onClick={() => this.changeTemp()}>
                  {this.state.temperature ? "°F" : "°C"}
                </div>
              </div>

              <div className='center icon'>
                <img
                  src={`./icons/${currentIcon}.svg`}
                  className='widget-logo-big'
                  alt='logo'
                />
              </div>
              <div className='center temp'>
                <h2>
                  {this.state.temperature
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
                  <p>{this.getDate(this.state.forecastToday.time)}</p>
                </div>
                <div className='center small-icon'>
                  <img
                    src={`./icons/${todayIcon}.svg`}
                    className='widget-logo-small'
                    alt='logo'
                  />
                </div>
                <div className='center small-temp'>
                  <p>
                    {this.state.temperature
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
                  <p>{this.getDate(this.state.forecastTomorrow.time)}</p>
                </div>
                <div className='center small-icon'>
                  <img
                    src={`./icons/${tomorrowIcon}.svg`}
                    className='widget-logo-small'
                    alt='logo'
                  />
                </div>
                <div className='center small-temp'>
                  <p>
                    {this.state.temperature
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
                  <p>
                    {this.getDate(this.state.forecastDayAfterTomorrow.time)}
                  </p>
                </div>
                <div className='center small-icon'>
                  <img
                    src={`./icons/${dayAfterTomorrowIcon}.svg`}
                    className='widget-logo-small'
                    alt='logo'
                  />
                </div>
                <div className='center small-temp'>
                  <p>
                    {this.state.temperature
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
