const axios = require('axios');

const URL =
  'https://f447a5d5-06b6-4489-9695-04ef87e544f4:HG44e1OJo4@twcservice.mybluemix.net/api/weather/v1/geocode/33.40/-83.42/observations.json';

async function getWeather() {
  try {
    const { data } = await axios({
      method: 'get',
      url: URL,
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        language: 'en-US'
      }
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = getWeather;
