const axios = require('axios');

async function getLocationThroughZipCode(zipcode) {
  const targeturl = `https://f447a5d5-06b6-4489-9695-04ef87e544f4:HG44e1OJo4@twcservice.mybluemix.net/api/weather/v3/location/point?postalKey=${zipcode}%3AUS&language=en-US`;
  try {
    const { data } = await axios.get(targeturl);
    return data.location;
  } catch (err) {
    console.log(err);
  }
}

async function getForcast(lat, lon) {
  const URL = `https://f447a5d5-06b6-4489-9695-04ef87e544f4:HG44e1OJo4@twcservice.mybluemix.net/api/weather/v1/geocode/${lat}/${lon}/observations.json`;
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

module.exports = {
  getForcast: getForcast,
  getLocationThroughZipCode: getLocationThroughZipCode
};
