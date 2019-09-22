const express = require('express');
const { getForcast, getLocationThroughZipCode, haversine } = require('../ibmApi/ibmUtility');
const router = express.Router();
const { scrapeAndParse } = require('../ibmApi/scrapeFireData');

router.get('/forcast/:zipcode', async function(req, res, next) {
  try {
    const { latitude, longitude } = await getLocationThroughZipCode(req.params.zipcode);
    const forcast = await getForcast(latitude, longitude);
    console.log(forcast);
    res.status(200).send(forcast);
  } catch (err) {
    next(err);
  }
});

router.get('/firedata/:zipcode', async (req, res, next) => {
  try {
    const l = scrapeAndParse();
    const { latitude, longitude } = await getLocationThroughZipCode(req.params.zipcode);
    const within10km = [];
    l.forEach(loc => {
      if (haversine(latitude, longitude, loc.lat, loc.lon) < 10) {
        within10km.push(loc);
      }
    });
    res.status(200).send(within10km);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
