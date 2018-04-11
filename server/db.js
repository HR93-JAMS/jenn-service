const mongoose = require('mongoose');

const url = 'mongodb://jenn:mlab@ds147480.mlab.com:47480/fantasybnb';
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('we are connected!');
});

let listingSchema = mongoose.Schema({
  id: Number,
  imageUrl: String,
  description: String,
  title: String,
  price: Number,
  num_reviews: Number,
  avg_rating: Number,
  keywords: [String],
});

const Listing = mongoose.model('Listing', listingSchema);

const save = (listingObj) => {
  Listing.create(listingObj, (err, listing) => {
    if (err) {
      console.log('error in creating', err);
    } else {
      console.log('listing created', listing);
    }
  });
};

const fakeListing = {
  id: 1,
  imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/spongebob.png',
  description: 'ENTIRE HOUSE 1 BED',
  title: '124 Conch Street',
  price: 45,
  num_reviews: 96,
  avg_rating: 4.78,
  keywords: ['animated', 'happy', 'home'],
};

save(fakeListing);


Listing.find((err, listings) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('here are the listings', listings);
  }
});

