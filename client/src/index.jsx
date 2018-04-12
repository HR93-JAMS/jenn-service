import React from 'react';
import ReactDOM from 'react-dom';
import Slider from  'react-slick';
import styles from './style.css';
// import exampleListings from '../../data/exampleData.js'

class SimilarListings extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        listings: exampleListings
      }
    }

    render () {

      var settings = {
        slidesToShow: 3,
        slidesToScroll: 1, 
        arrows: true
      };

      return (
        <div className={styles.listings}>
          <h1 className={`${styles.header} ${styles.font} `}>Similar listings</h1>
          <div className={styles.container}>
            {/* <button className={styles.button}>Vanity Button</button> */}

            <Slider {...settings}>
            {
              this.state.listings.map((listing) => {
                return <Listing data={listing}/>
              })
            }
            </Slider>

            
          </div>
        </div>
      )
    };

}

const Listing = ({data}) => (

  <div>
    <img className={styles.image} src={data.imageUrl} />
    <h4>{data.description}</h4>
    <h2>{data.title}</h2>
    <p>{data.price}</p>
    <p>{data.num_reviews}</p>
  </div>
)

// const exampleListings= [{title: 'happy'}, {title: 'test'}];


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