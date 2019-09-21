const express = require('express');
const { getForcast, getLocationThroughZipCode } = require('../ibmApi/ibmUtility');
const router = express.Router();

router.get('/:zipcode', async function(req, res, next) {
  try {
    const { latitude, longitude } = await getLocationThroughZipCode(req.params.zipcode);
    const forcast = await getForcast(latitude, longitude);
    res.status(200).send(forcast);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
