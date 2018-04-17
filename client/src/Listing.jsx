import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';


const Listing = ({data}) => (

  <div>
    <img className={styles.image} src={data.imageUrl} />
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