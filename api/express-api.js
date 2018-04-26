var express = require('express');
var app = express();

app.post('/event', function (req, res) {
  res.send('Event API');
});

app.post('/pageview', function (req, res) {
  res.send('Pageview API');
});

app.post('/click', function (req, res) {
  res.send('Click API');
});

app.post('/error', function (req, res) {
  res.send('Error API');
});

 
app.listen(3000);
