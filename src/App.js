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

  tempAvg = [];

  //pobranie zapisanych w storage miast, o ile istnieją
  componentDidMount() {
    this.getLocalStorage();
  }

  //pobranie danych pogodowych przy kazdorazowym dodaniu miasta lub zmianie jednostki wyswietlania temperatury
  componentDidUpdate() {

    const { weather, cities } = this.state;

    if ((cities.length > weather.length) || this.state.degFlag) {

      Promise.all(this.state.cities.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},PL&units=${this.state.deg}&APPID=96993feca341f53ea0847433eae53af5`)
          .then(response => {
            if (response.ok) {
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
            this.rewriteArrayCities();
            this.setLocalStorage();
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  // aby nie renderowac w nieskonczonosc (wywolywac componentDidUpdate()) zapis sredniej temp. do osobnej zmiennej
  handleAvg = (tempAvg) => {
    this.tempAvg = tempAvg;
  }

  //pobranie miast z local storaage i zapisanie je do stanu
  getLocalStorage = () => {
    let savedCity = localStorage.getItem("storageCity");
    let cities;

    if (savedCity) {
      cities = JSON.parse(savedCity);
      this.setState({
        cities
      })
    }
  }
  //zapis miast z listy do local storage
  setLocalStorage = () => {
    if (this.state.cities.length)
      localStorage.setItem("storageCity", JSON.stringify(this.state.cities));
  };

  //obsluga nazwy  miasta otrzymanego z formularza. sprawdzenie czy miasto juz istnieje na liscie
  handleAddCity = (city) => {
    let cities = this.state.cities;
    let cityExist = cities.filter(item => item === city);

    if (cityExist.length) {
      console.log("Miasto znajduje się już na liście");
      alert("Miasto znajduje się już na liście");
    }
    else {
      cities.push(city);
      this.setState({
        cities
      })
    }
  }

  //zamiana nazw miast w state z wpisanych przez uzytkownika na te otrzymane z Api  
  rewriteArrayCities = () => {
    let weather = this.state.weather;
    let newCityName;
    newCityName = weather.map(item => item.city.name);

    this.setState({
      cities: newCityName
    })

  }
  //usuniecie wskazanego miast z listy 
  handleRemoveCity = (id) => {
    let weather = this.state.weather;
    let cities = this.state.cities;
    let cityName;
    cityName = weather.filter(item => item.city.id === id);
    weather = weather.filter(item => item.city.id !== id);
    cities = cities.filter(item => item !== cityName[0].city.name)

    this.setState({
      weather,
      cities
    })
  }
  //osbluga seetings - jednostki temperatury i sprawdzenie czy nastapila zmiana - ustawienie flagi w celu wywolania renderignu componentDidUpdate
  handleDeg = (deg) => {
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
        <Route path="/settings/" component={() => <Settings handleDeg={this.handleDeg} deg={this.state.deg} changeDeg={this.state.changeDeg} />} />
        <Route exact path="/" component={() => (<div className="list"><Form handleAddCity={this.handleAddCity} /> <List weather={this.state.weather} handleRemoveCity={this.handleRemoveCity} deg={this.state.deg} handleAvg={this.handleAvg} /></div>)} />
        <Route path="/city/:id" component={(props) => <Details weather={this.state.weather} tempAvg={this.tempAvg} deg={this.state.deg} {...props} />} />
      </div>
    )
  }
}

export default App;
