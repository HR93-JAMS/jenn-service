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

// Listing.find((err, listings) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('here are the listings', listings);
//   }
// });



getSimilarListings = (id, callback) => {

  Listing.findOne({ id: id }, 'price keywords id')
  .then((listing) => {
    let price = listing.price;
    let keywords = listing.keywords;
    let currentId = listing.id;

    return Listing.find({ price: {$gt: price-100, $lt: price+100 }, keywords: {$in: keywords}})
      .where({ id: {$ne: currentId}})
      .sort({avg_rating: -1});
  }).then((listings) => {
    if (listings.length < 1) {
      return Listing.find({keywords: {$in: keywords}})
        .where({ id: {$ne: currentId}})
        .sort({avg_rating: -1});
     } else {
      return listings;
     } 
  }).then((listings) => {
    console.log('here are the similar listings', listings);
    callback(listings);
  });

    


}

getSimilarListings(1);


module.exports.save = save;
module.exports.getSimilarListings = getSimilarListings;

