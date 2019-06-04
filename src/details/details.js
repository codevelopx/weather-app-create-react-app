import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './details.css';

class Details extends Component {

    render() {
        let city;
        let temp;

        if (this.props.weather) {
            city = this.props.weather.filter(item => item.city.id === parseInt(this.props.match.params.id));
            temp = this.props.tempAvg.filter(item => item.id === parseInt(this.props.match.params.id));
        }

        return (
            <div>
                <div className="cityName">
                    {city[0].city.name}
                </div>
                <div className="detailsContainer">
                    <div>
                        <div>
                            szerokość geograficzna:
                        </div>
                        <div>
                            {city[0].city.coord.lat}
                        </div>
                    </div>
                    <div>
                        <div>
                            długość geograficzna:
                        </div>
                        <div>
                            {city[0].city.coord.lon}
                        </div>
                    </div>
                    <div>
                        <div>
                            średnia temperatura
                        </div>
                        <div>
                            {temp[0].temp}
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