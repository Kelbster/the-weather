// weather underground info: https://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary&MR=1
// icons are from: http://www.danvierich.de/weather/

import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
require('./index.scss');

const APIKEY = 'a0703d61a8b0827b';
const iconPath = './src/img/';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      latitude: null,
      longitude: null,
      isCelsius: false
    };

    this.getLocation = this.getLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setWeatherState = this.setWeatherState.bind(this);
  }

  componentDidMount() {
    this.getLocation()
      .then(this.fetchData)
      .then(this.setWeatherState)
      .catch((err) => { console.log(err) });
  }

  getLocation() {
    // using https://ipinfo.io/ to get current location vs native geolocation
    return Axios.get('https://ipinfo.io')
      .then((response) => {
        let position = response.data.loc.split(',');
        return position;
      });
  }

  fetchData(position) {
    const lat = position[0];
    const lon = position[1];
    return Axios.get(`http://api.wunderground.com/api/${ APIKEY }/conditions/q/${ lat },${ lon }.json`)
      .then((response) => {
        return response.data.current_observation;
      });
  }

  setWeatherState(weather) {
    this.setState({
      isLoading: false,
      fahrenheight: weather.temp_f,
      celsius: weather.temp_c,
      weather: weather.weather,
      windDirection: weather.wind_dir,
      windString: weather.wind_string
    });
  }

  getIcon() {
    const weatherType = this.state.weather;
    const weatherIcon = {
      'Heavy Drizzle': 'sw-22',
      'Light Drizzle': 'sw-21',
      'Drizzle': 'sw-21',
      'Heavy Rain': 'sw-23',
      'Light Rain': 'sw-21',
      'Rain': 'sw-22',
      'Heavy Snow': 'sw-25',
      'Light Snow': 'sw-24',
      'Snow': 'sw-25',
      'Heavy Snow Grains': 'sw-25',
      'Light Snow Grains': 'sw-24',
      'Snow Grains': 'sw-25',
      'Heavy Ice Crystals': 'sw-29',
      'Light Ice Crystals': 'sw-28',
      'Ice Crystals': 'sw-29',
      'Heavy Ice Pellets': 'sw-29',
      'Light Ice Pellets': 'sw-28',
      'Ice Pellets': 'sw-29',
      'Heavy Hail': 'sw-29',
      'Light Hail': 'sw-28',
      'Hail': 'sw-29',
      'Heavy Mist': 'sw-08',
      'Light Mist': 'sw-08',
      'Mist': 'sw-08',
      'Heavy Fog': 'sw-09',
      'Light Fog': 'sw-09',
      'Fog': 'sw-09',
      'Heavy Fog Patches': 'sw-09',
      'Light Fog Patches': 'sw-09',
      'Fog Patches': 'sw-09',
      'Heavy Smoke': 'sw-05',
      'Light Smoke': 'sw-05',
      'Smoke': 'sw-05',
      'Heavy Volcanic Ash': 'sw-05',
      'Light Volcanic Ash': 'sw-05',
      'Volcanic Ash': 'sw-05',
      'Heavy Widespread Dust': 'sw-30',
      'Light Widespread Dust': 'sw-30',
      'Widespread Dust': 'sw-30',
      'Heavy Sand': 'sw-30',
      'Light Sand': 'sw-30',
      'Sand': 'sw-30',
      'Heavy Haze': 'sw-05',
      'Light Haze': 'sw-05',
      'Haze': 'sw-05',
      'Heavy Spray': 'sw-10',
      'Light Spray': 'sw-10',
      'Spray': 'sw-10',
      'Heavy Dust Whirls': 'sw-30',
      'Light Dust Whirls': 'sw-30',
      'Dust Whirls': 'sw-30',
      'Heavy Sandstorm': 'sw-30',
      'Light Sandstorm': 'sw-30',
      'Sandstorm': 'sw-30',
      'Heavy Low Drifting Snow': 'sw-25',
      'Light Low Drifting Snow': 'sw-24',
      'Low Drifting Snow': 'sw-25',
      'Heavy Low Drifting Widespread Dust': 'sw-30',
      'Light Low Drifting Widespread Dust': 'sw-30',
      'Low Drifting Widespread Dust': 'sw-30',
      'Heavy Low Drifting Sand': 'sw-30',
      'Light Low Drifting Sand': 'sw-30',
      'Low Drifting Sand': 'sw-30',
      'Heavy Blowing Snow': 'sw-25',
      'Light Blowing Snow': 'sw-25',
      'Blowing Snow': 'sw-25',
      'Heavy Blowing Widespread Dust': 'sw-30',
      'Light Blowing Widespread Dust': 'sw-30',
      'Blowing Widespread Dust': 'sw-30',
      'Heavy Blowing Sand': 'sw-30',
      'Light Blowing Sand': 'sw-30',
      'Blowing Sand': 'sw-30',
      'Heavy Rain Mist': 'sw-22',
      'Light Rain Mist': 'sw-21',
      'Rain Mist': 'sw-21',
      'Heavy Rain Showers': 'sw-23',
      'Light Rain Showers': 'sw-21',
      'Rain Showers': 'sw-22',
      'Heavy Snow Showers': 'sw-25',
      'Light Snow Showers': 'sw-24',
      'Snow Showers': 'sw-25',
      'Heavy Snow Blowing Snow Mist': 'sw-25',
      'Light Snow Blowing Snow Mist': 'sw-24',
      'Snow Blowing Snow Mist': 'sw-25',
      'Heavy Ice Pellet Showers': 'sw-29',
      'Light Ice Pellet Showers': 'sw-29',
      'Ice Pellet Showers': 'sw-29',
      'Heavy Hail Showers': 'sw-29',
      'Light Hail Showers': 'sw-28',
      'Hail Showers': 'sw-29',
      'Heavy Small Hail Showers': 'sw-29',
      'Light Small Hail Showers': 'sw-28',
      'Small Hail Showers': 'sw-29',
      'Heavy Thunderstorm': 'sw-27',
      'Light Thunderstorm': 'sw-27',
      'Thunderstorm': 'sw-27',
      'Heavy Thunderstorms and Rain': 'sw-27',
      'Light Thunderstorms and Rain': 'sw-27',
      'Thunderstorms and Rain': 'sw-27',
      'Heavy Thunderstorms and Snow': 'sw-25',
      'Light Thunderstorms and Snow': 'sw-24',
      'Thunderstorms and Snow': 'sw-25',
      'Heavy Thunderstorms and Ice Pellets': 'sw-29',
      'Light Thunderstorms and Ice Pellets': 'sw-29',
      'Thunderstorms and Ice Pellets': 'sw-29',
      'Heavy Thunderstorms with Hail': 'sw-29',
      'Light Thunderstorms with Hail': 'sw-28',
      'Thunderstorms with Hail': 'sw-29',
      'Heavy Thunderstorms with Small Hail': 'sw-28',
      'Light Thunderstorms with Small Hail': 'sw-28',
      'Thunderstorms with Small Hail': 'sw-28',
      'Heavy Freezing Drizzle': 'sw-26',
      'Light Freezing Drizzle': 'sw-26',
      'Freezing Drizzle': 'sw-26',
      'Heavy Freezing Rain': 'sw-26',
      'Light Freezing Rain': 'sw-26',
      'Freezing Rain': 'sw-26',
      'Heavy Freezing Fog': 'sw-09',
      'Light Freezing Fog': 'sw-09',
      'Freezing Fog': 'sw-09',
      'Patches of Fog': 'sw-09',
      'Shallow Fog': 'sw-09',
      'Partial Fog': 'sw-09',
      'Overcast': 'sw-04',
      'Clear': 'sw-01',
      'Partly Cloudy': 'sw-03',
      'Mostly Cloudy': 'sw-04',
      'Scattered Clouds': 'sw-06',
      'Small Hail': 'sw-28',
      'Squalls': 'sw-06',
      'Funnel Cloud': 'sw-30',
      'Unknown Precipitation': 'sw-06',
      'Unknown': 'sw-06',
    };
    const src = `${ iconPath }${ weatherIcon[weatherType] }.svg`;

    return <img className="weather-icon" src={ src } alt={ weatherType } />;
  }

  getWindDirection() {
    const direction = this.state.windDirection;
    const windIcon = {
      'East': 'sw-42',
      'ENE': 'sw-45',
      'ESE': 'sw-46',
      'NE': 'sw-45',
      'NNE': 'sw-45',
      'NNW': 'sw-48',
      'North': 'sw-41',
      'NW': 'sw-48',
      'SE': 'sw-46',
      'South': 'sw-43',
      'SSE': 'sw-46',
      'SSW': 'sw-47',
      'SW': 'sw-47',
      'Variable': null,
      'West': 'sw-44',
      'WNW': 'sw-48',
      'WSW': 'sw-47'
    }
    const src = `${ iconPath }${ windIcon[direction] }.svg`;

    return <img src={ src } alt={ direction } />;
  }

  tempType() {
    return !this.state.isCelsius ? `${ this.state.fahrenheight }° F` : `${ this.state.celsius }° C`
  }

  toggleTemp() {
    !this.state.isCelsius ? this.setState({ isCelsius: true }) : this.setState({ isCelsius: false });
  }

  backgroundStyle() {
    const temp = this.state.fahrenheight;
    if (temp > 80) { // hot
      return ({ backgroundImage: "linear-gradient(15deg, #cd455e 0%, #ff7240 100%)" });
    }
    if (temp > 59) { // warm
      return ({ backgroundImage: "linear-gradient(15deg, #976395 0%, #d7a864 100%)" });
    }
    else if (temp > 32) { // cold
      return ({ backgroundImage: "linear-gradient(15deg, #7f6c9e 0%, #acc5de 100%)" });
    }
    else { // freezing
      return ({ backgroundImage: "linear-gradient(15deg, #616986 0%, #9fa9c1 100%)" });
    }

  }

  render() {
    return (
      <div className="weather-component" style={ !this.state.isLoading ? this.backgroundStyle() : { backgroundImage: '#35343b' }}>
        <div className="weather-container">
          <h1>LOCAL WEATHER</h1>
          { this.state.isLoading
            ? <div>
                <p>Getting your location</p>
                <div className="loading" />
              </div>
            : <div>
                <div className="flex-it">
                  <div>
                    { this.getIcon() }
                    <p>{ this.state.weather }</p>
                  </div>
                  <div>
                    <p className="temp">{ this.tempType() }</p>
                  </div>
                </div>
                <div>
                  <p className="wind">What's the wind like? { this.state.windString }{ this.getWindDirection() }</p>
                  <button onClick={ () => this.toggleTemp() }>Switch to { !this.state.isCelsius ? 'Celsius' : 'Fahrenheight' }</button>
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
};

ReactDOM.render(<Weather />, document.getElementById('app'));
