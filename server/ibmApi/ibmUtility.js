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
        language: 'en-US',
        units: 'e'
      }
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

Number.prototype.toRad = function() {
  return (this * Math.PI) / 180;
};

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  //has a problem with the .toRad() method below.
  const x1 = lat2 - lat1;
  const dLat = x1.toRad();
  const x2 = lon2 - lon1;
  const dLon = x2.toRad();
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

module.exports = {
  getForcast: getForcast,
  getLocationThroughZipCode: getLocationThroughZipCode,
  haversine: haversine
};
