const express = require('express');
let parser = require('body-parser');
let morgan = require('morgan'); 
let db = require('./db.js');

let app = express();

app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(__dirname + '/../client/dist'));


app.get('/rooms/:listingId/similar_listings', (req, res) => {

  let id = req.params.listingId;
  console.log('here is the id', id);
  db.getSimilarListings(id, (listings) => {
    console.log('here are all the similar listings!', listings);
    //json stringify?
    res.send(listings);
  });

});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

