// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Serve the index page for the root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to process date input
app.get('/api/:date?', function(req, res){
  let date = req.params.date;
  let unixDate;
  let dateObj;
  //if is number
  let isUnix = /^\d+$/.test(date);
  if(!date){
    dateObj = new Date();
  }
  else if(date && isUnix){
    unixDate = parseInt(date);
    dateObj = new Date(unixDate);
  }
  else if(date && !isUnix) {
    dateObj = new Date(date);
    
  }
  if(dateObj.toString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
    return;
  }
  unixDate = dateObj.getTime();
  utcDate = dateObj.toUTCString();
  res.json({unix: unixDate, utc: utcDate});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
