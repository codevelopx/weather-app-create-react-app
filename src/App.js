import React, { Component } from 'react';
import Form from './form/form';
import List from './list/list';
import Settings from './settings/settings'
import Details from './details/details';
import { Route, Link } from 'react-router-dom'

import './App.css';

class App extends Component {

  state = {
    weather: [],
    cities: [],
    deg: "metric",
    degFlag: false,
  }

  tempAvg = []

  componentDidMount() {
    this.getLocalStorage();
  }

  componentDidUpdate() {

    const { weather, cities } = this.state;

    console.log(cities.length, weather.length);

    console.log("deg", this.state.deg);

    console.log("flaga degFlag: ", this.state.degFlag);

    if ((cities.length > weather.length) || this.state.degFlag) {

      Promise.all(this.state.cities.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},PL&units=${this.state.deg}&APPID=96993feca341f53ea0847433eae53af5`)
          // fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${city}&units=metric&APPID=96993feca341f53ea0847433eae53af5`)
          .then(response => {
            if (response.ok) {
              console.log(response.ok);
              return response.json();
            }
            else
              throw new Error('Podałeś złą nazwę miasta lub nie mogę się połączyć z API !!!!!!!!!!!!!');
          })
      ))
        .then(weather => {
          this.setState({
            weather,
            degFlag: false
          }, () => {
            console.log("jestem w update")
            this.rewriteArrayCities();
            this.setLocalStorage();
          })
        })
        .catch((error) => {
          console.log(error)
          alert(error);
        });


    }
  }

  handleAvg = (tempAvg) => {
    console.log("Wywołanie handle AVG !!!")
    this.tempAvg = tempAvg;
    console.log(this.tempAvg);
  }

  getLocalStorage = () => {
    //pobieram nazwy miast z LocalStorage
    let savedCity = localStorage.getItem("storageCity");
    let cities;

    //jeżeli są zapisane miasta, to pobieram dane z Api
    if (savedCity) {
      cities = JSON.parse(savedCity);
      console.log(savedCity);
      this.setState({
        cities
      })
    }
  }

  setLocalStorage = () => {
    console.log("ZAPIS do local storage uruchamiany")
    if (this.state.cities.length)
      localStorage.setItem("storageCity", JSON.stringify(this.state.cities));
  };


  handleAddCity = (city) => {
    console.log("Wywołanie handleAddCity");
    let cities = this.state.cities;
    cities.push(city);

    this.setState({
      cities
    })

  }

  rewriteArrayCities = () => {
    console.log("rewriteArrayCities");

    let weather = this.state.weather;
    let newCityName;
    newCityName = weather.map(item => item.city.name);

    console.log(newCityName);
    this.setState({
      cities: newCityName
    })

  }

  handleRemoveCity = (id) => {

    let weather = this.state.weather;
    let cities = this.state.cities;
    let cityName;
    cityName = weather.filter(item => item.city.id === id);
    weather = weather.filter(item => item.city.id !== id);
    console.log(cityName[0].city.name);
    cities = cities.filter(item => item !== cityName[0].city.name)
    console.log(cities)

    this.setState({
      weather,
      cities
    })
  }

  handleDeg = (deg) => {
    console.log("handleDeg:", deg);

    if (deg === this.state.deg) {
      this.setState({
        degFlag: false
      })
    } else {
      this.setState({
        degFlag: true
      })
    }


    if (deg === "metric") {
      this.setState({
        deg: "metric",
      })

    }
    else if (deg === "imperial") {
      this.setState({
        deg: "imperial",
      })
    }
  }


  render() {

    return (
      <div className="container">
        <div className="settings">
          <Link to="/settings">Ustawienia</Link>
        </div>


        <Route path="/settings/" component={(props) => <Settings handleDeg={this.handleDeg} deg={this.state.deg} changeDeg={this.state.changeDeg} />} />
        <Route exact path="/" component={(props) => (<div className="list"><Form handleAddCity={this.handleAddCity} /> <List weather={this.state.weather} handleRemoveCity={this.handleRemoveCity} deg={this.state.deg} handleAvg={this.handleAvg} /></div>)} />
        <Route path="/city/:id" component={(props) => <Details weather={this.state.weather} tempAvg={this.tempAvg} deg={this.state.deg} {...props} />} />

      </div>
    )
  }

}

export default App;
