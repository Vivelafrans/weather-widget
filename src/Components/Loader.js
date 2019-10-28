import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default class WeatherLoader extends Component {
  render() {
    return <Loader type='BallTriangle' color='#FFF' height={100} width={100} />;
  }
}
