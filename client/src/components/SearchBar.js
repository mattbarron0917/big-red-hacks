import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  updateZip = e => {
    this.setState({ input: e.target.value });
  };

  sendZip = () => {
    this.props.getZip(this.state.input);
  };

  render() {
    return (
      <div id="search-bar">
        <h3>Please input Your Zipcode below:</h3>
        <input
          onChange={this.updateZip}
          value={this.state.input}
          type="text"
          name="zipcode"
        ></input>
        <Button color="primary" onClick={this.sendZip}>
          Search
        </Button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  input: PropTypes.string
};
