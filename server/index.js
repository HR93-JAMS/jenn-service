const express = require('express');
let parser = require('body-parser');
let morgan = require('morgan'); 
let db = require('./db.js');

let app = express();

app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static('../client/dist'));


app.get('/rooms/:listingId/similar_listings', (req, res) => {

  let id = req.params.listingId;
  db.getSimilarListings(id, (err, listings) => {
    if (err) {
      res.status(404);
      res.end(err);
    } else {
      console.log('here are all the similar listings!', listings);
      //json stringify?
      res.send(listings);
    }
  });

});

app.post('/rooms/:listingId', (req, res) => {

  let listingObj = req.body;
  db.save(listingObj, (err, listing) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.send(listing);
    }
  })

});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

