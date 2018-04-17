import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';


const Listing = ({data}) => (

  <div>
    <div className={styles.imageContainer}>
    <svg className={styles.heartSVG}>
      <path className={styles.heartPath} d='m 23.99 2.75 c -0.3 0 -0.6 0.02 -0.9 0.05 c -1.14 0.13 -2.29 0.51 -3.41 1.14 c -1.23 0.68 -2.41 1.62 -3.69 2.94 c -1.28 -1.32 -2.46 -2.25 -3.69 -2.94 c -1.12 -0.62 -2.27 -1 -3.41 -1.14 a 7.96 7.96 0 0 0 -0.9 -0.05 c -1.88 0 -7.26 1.54 -7.26 8.38 c 0 7.86 12.24 16.33 14.69 17.95 a 1 1 0 0 0 1.11 0 c 2.45 -1.62 14.69 -10.09 14.69 -17.95 c 0 -6.84 -5.37 -8.38 -7.26 -8.38' />
    </svg>
      <img className={styles.image} src={data.imageUrl} />
    </div>
    <div className={styles.listingText}>
      <h4 className={styles.description}>{data.description}</h4>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.price}>${data.price} per night</p>
      <Rating rating={data.avg_rating}/>
      <span className={styles.numReviews}>{data.num_reviews}</span>
    </div>
  </div>
)

const Rating = ({rating}) => {

  let stars = [];
  for (let i = 0; i < 10; i++) {
    let klass = `fas fa-star ${styles.gray} ${styles.stars}`;
    if (rating >= i) {
      klass = `fas fa-star teal ${styles.teal} ${styles.stars}`;
    }
    stars.push(
      <span 
        style={{
          display: "inline-block",
          width: "5px",
          overflow: "hidden",
          direction: i % 2 === 0 ? "ltr" : "rtl"
        }}
        className={klass}
      />
    );
  }

return (

  <span>{stars}</span>

)

  
    
    


}

export default Listing; 