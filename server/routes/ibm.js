const express = require('express');
const { getForcast, getLocationThroughZipCode } = require('../ibmApi/ibmUtility');
const router = express.Router();
const { scrapeAndParse } = require('./../scrapeFireData');

router.get('/forcast/:zipcode', async function(req, res, next) {
  try {
    const { latitude, longitude } = await getLocationThroughZipCode(req.params.zipcode);
    const forcast = await getForcast(latitude, longitude);
    console.log(forcast)
    res.status(200).send(forcast);
  } catch (err) {
    next(err);
  }
});

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

const haversine = (lat1,lon1,lat2,lon2) => {
 
 const R = 6371; // km 
 //has a problem with the .toRad() method below.
 const x1 = lat2-lat1;
 const dLat = x1.toRad();  
 const x2 = lon2-lon1;
 const dLon = x2.toRad();  
 const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                 Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                 Math.sin(dLon/2) * Math.sin(dLon/2);  
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
 const d = R * c; 
 return d;
}

router.get('/firedata/:zipcode', async (req, res, next) => {
  try {

    const l = scrapeAndParse(); 
    const { latitude, longitude } = await getLocationThroughZipCode(req.params.zipcode);
    const within10km = [];
    l.forEach(loc => {
      if (haversine(latitude,longitude,loc.lat,loc.lon) < 10) {
        within10km.push(loc);
      }
    });
    res.send(within10km);
  } catch (err) {
    next(err)
  }

});

module.exports = router;
