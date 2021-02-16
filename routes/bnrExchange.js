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
      const rates = ratesResponse.DataSet.Body.Cube;
      // res.render('bnrExchange', {
      //   title: "Curs de schimb valabil la data de:"
      //   , date: rates.date
      //   , rates: rates.Rate
      // });
      res.send(JSON.stringify(rates, null, '\t'))
    })
    .catch(function (err) {
      console.log(err);
      // handle the error here
    })
});

module.exports = router;
