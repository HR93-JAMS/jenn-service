import React from 'react';
import ReactDOM from 'react-dom';
import Slider from  'react-slick';
import styles from './style.css';
import Listing from './Listing.jsx';
import rightArrow from '../dist/arrow-slider-right.png';
import prevArrow from '../dist/arrow-slider-left.png';
import _ from 'underscore';

// import exampleListings from '../../data/exampleData.js'

class SimilarListings extends React.Component {

    constructor(props) {
      //need to change currentlistingID to passed down props id
      super(props);
      this.state = {
        listings: exampleListings,
        index: 0,
        currentListingId: 4,
        listingsLength: 3
      }

    }

    componentDidMount () {

      fetch(`/rooms/${this.state.currentListingId}/similar_listings`)
      .then(response => response.json())
      .then(
        (listings) => {
          console.log('success', listings);
          this.setState({
            listings: listings,
            index: 0,
            listingsLength: listings.length
          })
        },
  
        (error)=> {
          console.log('sorry error!', error);
        }  
      )
      // grab the props from app and make an api call
    }

    render () {

      var settings = {
        slidesToShow: 3,
        slidesToScroll: 1, 
        arrows: true,
        infinite: false,
        nextArrow: <NextArrow  currentIndex = {this.state.index} maxLength = {this.state.listingsLength}/>,
        prevArrow: <PrevArrow currentIndex = {this.state.index}/>,
        afterChange: current => this.setState({index: current})
      };

      return (
        <div className={styles.listings}>
        <h1 className={`${styles.header} ${styles.font} `}>Similar listings</h1>
        {/* <span onClick={() => this.handleClick("left")} className={`${styles.leftArrow}`}/> */}



            <Slider {...settings}>
            {
              this.state.listings.map((listing, index) => {
                return <Listing key={index} data={listing} index={index}/>
              })
            }
            </Slider>
        </div>
      )
    };

}


const NextArrow = ({onClick, incrementIndex, currentIndex, maxLength, debounceInc}) => {
  let visibilityState = (currentIndex < maxLength - 3 ) ? "visible" : 'hidden';
  return (
      <span
          style={{visibility: visibilityState}}
          className="slick-arrow"
          onClick={onClick}
      >
          <img src={rightArrow} className={styles.nextArrow}/>
      </span>
  );
}

const PrevArrow = ({onClick, decrementIndex, currentIndex}) => {
  let visibilityState = (currentIndex > 0 ) ? "visible" : 'hidden';
  return (
      <span
          style={{visibility: visibilityState}}
          className="slick-arrow"
          onClick={onClick}
      >
          <img src={prevArrow} className={styles.prevArrow} />
      </span>
  );
}


const exampleListings = [ { keywords: [ 'animated', 'happy', 'home' ],
id: 1,
imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/1.jpg',
description: 'ENTIRE HOUSE 1 BED',
title: '124 Conch Street',
price: 45,
num_reviews: 96,
avg_rating: 4.78,
__v: 0 },
{ keywords: [ 'home', 'real' ],
id: 2,
imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/2.jpg',
description: 'ENTIRE APARTMENT 1 BED',
title: '221b Baker Street',
price: 199,
num_reviews: 47,
avg_rating: 3.29,
__v: 0 },
{ keywords: [ 'home', 'animated' ],
id: 4,
imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/4.jpg',
description: 'ENTIRE HOUSE 3 BEDS',
title: '742 Evergreen Terrace',
price: 125,
num_reviews: 28,
avg_rating: 2.35,
__v: 0 },
{ keywords: [ 'home', 'animated' ],
id: 3,
imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/3.jpg',
description: 'ENTIRE HOUSE 4 BEDS',
title: '31 Spooner Street',
price: 120,
num_reviews: 64,
avg_rating: 4.82,
__v: 0 } ]

ReactDOM.render(<SimilarListings />, document.getElementById('similarListing'));