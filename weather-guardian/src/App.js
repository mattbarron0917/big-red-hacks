import React from 'react';
import axios from 'axios';
import './App.css';

const URL =
  'https://f447a5d5-06b6-4489-9695-04ef87e544f4:HG44e1OJo4@twcservice.mybluemix.net/api/weather/v1/geocode/33.40/-83.42/observations.json';

async function getWeather() {
  try {
    const response = await axios({
      method: 'get',
      url: URL,
      params: {
        language: 'en-US'
      }
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export default function App() {
  getWeather();
  return (
    <div className="App">
      <h1>Weather guardian unleashed!</h1>
    </div>
  );
}
