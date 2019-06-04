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
        this.props.handleAddCity(this.state.inputValue);
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



/* const handleSubmit = (e) => {
    e.preventDefault();
}


const Form = (props) => {

    console.log(props);

    return (
        <div className="form" >
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" className="city" placeholder="Nazwa miasta..." onChange={(e) => props.handleAddCity(e.target.value)} />
                <button className="addcity">Dodaj</button>
            </form>
        </div >
    )
}
export default Form */


// props.handleAddCity(e.target.value)