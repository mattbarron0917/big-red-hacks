import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: 0,
      data: {}
    };
  }

  getZip = async zip => {
    try {
      this.setState({ data: { waiting: true } });
      const { data } = await axios({
        method: 'get',
        url: `http://localhost:8080/ibmCloud/forcast/${zip}`
      });
      this.setState({ zipcode: zip, data: data });
    } catch (err) {
      this.setState({ data: { error: true } });
      console.log(err);
    }
  };

  displayData = () => {
    if (this.state.data.metadata) {
      return (
        <div className="forcast-text-box">
          <h5>Forcast for zipcode: {this.state.zipcode}</h5>
          <p>Wind Speed: {this.state.data.observation.wspd}</p>
          <p>Precipitation: {this.state.data.observation.precip_total}</p>
          <p>Wind Direction: {this.state.data.observation.wdir}</p>
        </div>
      );
    } else if (this.state.data.waiting) {
      return <div>Awaiting results...</div>;
    } else if (this.state.data.error) {
      return <div>Zip code could not be found</div>;
    } else {
      return <div>No data to currently display</div>;
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Weather guardian unleashed!</h1>
        <SearchBar getZip={this.getZip}></SearchBar>
        {this.displayData()}
      </div>
    );
  }
}

App.propTypes = {
  zipcode: PropTypes.number,
  data: PropTypes.object
};
