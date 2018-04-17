import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#similarListing');


class Listing extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
    this.data = this.props.data;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {

    return (
      <div>
        <div className={styles.imageContainer}>
        <svg className={styles.heartSVG}>
          <path onClick={this.handleOpenModal} className={styles.heartPath} d='m 23.99 2.75 c -0.3 0 -0.6 0.02 -0.9 0.05 c -1.14 0.13 -2.29 0.51 -3.41 1.14 c -1.23 0.68 -2.41 1.62 -3.69 2.94 c -1.28 -1.32 -2.46 -2.25 -3.69 -2.94 c -1.12 -0.62 -2.27 -1 -3.41 -1.14 a 7.96 7.96 0 0 0 -0.9 -0.05 c -1.88 0 -7.26 1.54 -7.26 8.38 c 0 7.86 12.24 16.33 14.69 17.95 a 1 1 0 0 0 1.11 0 c 2.45 -1.62 14.69 -10.09 14.69 -17.95 c 0 -6.84 -5.37 -8.38 -7.26 -8.38' />
          <Modal handleCloseModal={this.handleCloseModal} isOpen={this.state.showModal} />
        </svg>
          <img className={styles.image} src={this.data.imageUrl} />
        </div>
        <div className={styles.listingText}>
          <h4 className={styles.description}>{this.data.description}</h4>
          <h2 className={styles.title}>{this.data.title}</h2>
          <p className={styles.price}>${this.data.price} per night</p>
          <Rating rating={this.data.avg_rating}/>
          <span className={styles.numReviews}>{this.data.num_reviews}</span>
        </div>
      </div>
    )

  }
}

const Modal = ({isOpen, handleCloseModal}) => {

  return (
    <ReactModal 
      isOpen={isOpen}
      contentLabel="onRequestClose Example"
      onRequestClose={handleCloseModal}
      className={`${styles.Modal}`}
      overlayClassName={styles.Overlay}
    >
      <button onClick={handleCloseModal}>
        <svg className={styles.xSVG}>
        <path className={styles.xPath} d='m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22' />
          </svg>
      </button>

      <h1 className={styles.modalHeader}>Save to list</h1>
      <a className={styles.subHeader}>Create New List</a>
      <table>
        <tbody>
          <tr>
            <td>Dream Homes</td>
            <td> Heart</td>
          </tr>
          <tr>
            <td>Vacation Places</td>
            <td> Heart</td>
          </tr>
        </tbody>
      </table>
    </ReactModal>
  )

  
}
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