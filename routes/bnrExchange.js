let express = require('express');
let router = express.Router();
const fetch = require("node-fetch");
let parser = require('xml2json');

function handleErrors(response) {
  if (!response.ok) {
    throw new Error("Request failed " + response.statusText);
  }
  return response;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  fetch('https://bnr.ro/nbrfxrates.xml')
    .then(handleErrors)
    .then(res => res.text())
    .then(function (data) {
      console.log(data);  //expecting array
      const ratesResponse = parser.toJson(data, {object: true});
      const ratesValues = ratesResponse.DataSet.Body.Cube.Rate;
      const ratesDate = ratesResponse.DataSet.Body.Cube.date;
      // res.render('bnrExchange', {
      //   title: "Curs de schimb valabil la data de:"
      //   , date: ratesDate
      //   , rates: ratesValues
      // });
      res.send(JSON.stringify(ratesValues, null, '\t'))
    })
    .catch(function (err) {
      console.log(err);
      // handle the error here
    })
});

module.exports = router;
