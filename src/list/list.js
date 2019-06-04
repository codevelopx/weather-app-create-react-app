import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './list.css';

class List extends Component {

    // console.log("Propsy w List: ", props.weather);

    render() {
        let data = [];
        let temps = [];
        let temp;
        let tempAvg = [];

        if (this.props.weather.length) {
            data = this.props.weather.map((item, index) => (
                <div className="cityList" key={item.city.id}>
                    <div>{index}</div>
                    <div className="cityLink">
                        <Link to={`/city/${item.city.id}`}>
                            {item.city.name}
                        </Link>
                    </div>
                    {item.list.forEach(item => temps.push(item.main.temp))}
                    {/* {console.log(temps)} */}
                    <div>
                        {temp = (temps.map((x, i, arr) => x / arr.length).reduce((a, b) => a + b)).toFixed(1)}
                        {tempAvg.push({ "id": item.city.id, "temp": temp })}
                        {this.props.deg === 'metric' ? ' \u00B0C' : ' \u00B0F'}
                    </div>
                    <div><button onClick={() => this.props.handleRemoveCity(item.city.id)}>Usuń</button></div>
                    <div>{temps.length = 0}</div>

                </div>
            ))
        };
        this.props.handleAvg(tempAvg);
        return (
            <>
                <div className="cityListHeader">
                    <div>#</div>
                    <div>Miasto</div>
                    <div>Średnia prognozowana temperatura</div>
                    <div></div>
                </div>
                {data}
            </>


        )

    }

}

export default List;