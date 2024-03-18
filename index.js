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
app.get('/api/:date?', (req, res)=>{
  let dateString = req.params.date;
  console.log('Received date:', dateString); // Debug log
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    // Explicitly parse as integer for Unix timestamp
    const timestamp = parseInt(dateString);
    if (!isNaN(timestamp)) {
      // Create a date object using the timestamp if it's a valid number
      date = new Date(timestamp);
    } else {
      // Otherwise, try to create a date object directly from the input string
      date = new Date(dateString);
    }
  }

  console.log('Date object:', date); // Debug log

  if (date.toString() === "Invalid Date") {
    console.log('Invalid Date');
    res.json({error: "Invalid Date"});
  } else {
    const response = {unix: date.getTime(), utc: date.toUTCString()};
    console.log('Response:', response); // Debug log
    res.json(response);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
