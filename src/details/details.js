import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './details.css';

class Details extends Component {

    render() {
        let city;
        let cityData = {};
        let temp;

        if (this.props.weather) {
            city = this.props.weather.filter(item => item.city.id === parseInt(this.props.match.params.id));
            temp = this.props.tempAvg.filter(item => item.id === parseInt(this.props.match.params.id));

            cityData = {
                name: city.map(item => item.city.name),
                lat: city.map(item => item.city.coord.lat),
                lon: city.map(item => item.city.coord.lon),
                temp: temp.map(item => item.temp)
            }

        }

        return (
            <div>
                <div className="cityName">
                    {cityData.name}
                </div>
                <div className="detailsContainer">
                    <div>
                        <div>
                            szerokość geograficzna:
                        </div>
                        <div>
                            {cityData.lat}
                        </div>
                    </div>
                    <div>
                        <div>
                            długość geograficzna:
                        </div>
                        <div>
                            {cityData.lon}
                        </div>
                    </div>
                    <div>
                        <div>
                            średnia temperatura
                        </div>
                        <div>
                            {cityData.lon}
                            {this.props.deg === 'metric' ? ' \u00B0C' : ' \u00B0F'}
                        </div>
                    </div>
                </div>
                <div className="back">
                    <Link to="/">
                        Powrót
                    </Link>
                </div>
            </div>
        )
    }

}

export default Details