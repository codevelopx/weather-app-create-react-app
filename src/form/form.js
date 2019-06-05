import React, { Component } from 'react';

import './form.css';


class Form extends Component {

    state = {
        inputValue: '',
    }

    handleChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.inputValue) {
            this.props.handleAddCity(this.state.inputValue);
        } else {
            console.log("Podaj nazwę miasta");
            alert("Podaj nazwę miasta");
        }

        this.setState({ inputValue: '' });
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Nazwa miasta..." />
                    <input type="submit" value="Dodaj" />
                </form>
            </div>
        );
    }
}

export default Form

