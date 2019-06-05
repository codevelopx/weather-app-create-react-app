import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './settings.css';

class Settings extends Component {

    state = {
        selectedOption: this.props.deg
    }


    radioChange = (e) => {
        this.setState({
            selectedOption: e.currentTarget.value
        });
        this.props.handleDeg(e.currentTarget.value)
    }

    render() {
        return (
            <div className="set">
                <div className="setName">Ustawienia</div>
                <div className="radioButtonContainer">
                    <div>Jednostka:</div>
                    <div>
                        <label>
                            <input type="radio"
                                value="metric"
                                checked={this.state.selectedOption === "metric"}
                                onChange={this.radioChange} />
                            &#176;C
                    </label>

                        <label>
                            <input type="radio"
                                value="imperial"
                                checked={this.state.selectedOption === "imperial"}
                                onChange={this.radioChange} />
                            &#176;F
                    </label>
                    </div>
                </div>
                {/* <h3>{this.state.selectedOption}</h3> */}
                <div className="back">
                    <Link to="/">
                        Powrót
                </Link>
                </div>

                {/* </form> */}

            </div >
        );
    }
}

export default Settings