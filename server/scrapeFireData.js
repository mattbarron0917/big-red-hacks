const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function scrapeFireData() {
  const locations = [];
  request("https://fsapps.nwcg.gov/afm/current.php?op=table&sensor=modis", (error, response, body) => {
    if (error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);
    
    const $ = cheerio.load(body);
    $('tr[bgcolor="#FFFFFF"]').each((_,element) => {
      locations.push({lat: element.children[4].children[0].data, lon: element.children[3].children[0].data});
    });
    locations.forEach(loc => {
      fs.appendFileSync('/Users/ajani/gh/hackathons/big-red-hacks2019/out.txt', "{" + loc.lat + "," + loc.lon + "} ");
    })
    fs.appendFileSync('/Users/ajani/gh/hackathons/big-red-hacks2019/out.txt', "\n");
  });
}

function parseFireData() {
  const locations = [];
  const data = fs.readFileSync("/Users/ajani/gh/hackathons/big-red-hacks2019/out.txt", {encoding: 'utf-8'});
  data.split(" ").slice(0,-1).forEach(loc => {
    let d = loc.split(",");
    locations.push({lat: parseFloat(d[0].substring(1)), lon: parseFloat(d[1].substring(0,d[1].length))});
  });
  return locations;
}

function scrapeAndParse() {
  scrapeFireData();
  const locations = parseFireData();
  fs.unlinkSync("/Users/ajani/gh/hackathons/big-red-hacks2019/out.txt");
  return locations;
}

// console.log(scrapeAndParse());
module.exports = {
  scrapeAndParse,
  scrapeFireData,
  parseFireData
}