import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';
import ReactModal from 'react-modal';
import Rating from './Rating.jsx';
import MiniListing from './MiniListing.jsx';

ReactModal.setAppElement('#similarListing');


class Listing extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      lists: {'dream homes': false, 'vacation places': false},
      onList: false
    }
    this.data = this.props.data;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleHeartToggle = this.handleHeartToggle.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
    for (var key in this.state.lists) {
      if (this.state.lists[key]) {
        this.setState({
          onList: true
        })
      }
    }
  }

  handleHeartToggle (key) {
    console.log('current list', this.state.lists);
    let copiedLists = this.state.lists;
    copiedLists[key] = !copiedLists[key]
    console.log('copied list', copiedLists);
    this.setState({
      lists: copiedLists
    })
  }

  render () {

    return (
      <div>
        <div className={styles.imageContainer}>
        <svg className={this.state.onList ? styles.filledHeartSVG : styles.heartSVG}>
          <path onClick={this.handleOpenModal} className={styles.heartPath} d='m 23.99 2.75 c -0.3 0 -0.6 0.02 -0.9 0.05 c -1.14 0.13 -2.29 0.51 -3.41 1.14 c -1.23 0.68 -2.41 1.62 -3.69 2.94 c -1.28 -1.32 -2.46 -2.25 -3.69 -2.94 c -1.12 -0.62 -2.27 -1 -3.41 -1.14 a 7.96 7.96 0 0 0 -0.9 -0.05 c -1.88 0 -7.26 1.54 -7.26 8.38 c 0 7.86 12.24 16.33 14.69 17.95 a 1 1 0 0 0 1.11 0 c 2.45 -1.62 14.69 -10.09 14.69 -17.95 c 0 -6.84 -5.37 -8.38 -7.26 -8.38' />
          <Modal data={this.data} lists={this.state.lists} handleCloseModal={this.handleCloseModal} isOpen={this.state.showModal} handleHeartToggle={this.handleHeartToggle}/>
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

const Modal = ({isOpen, handleCloseModal, lists, handleHeartToggle, data}) => {

  return (
    <ReactModal 
      isOpen={isOpen}
      contentLabel="onRequestClose Example"
      onRequestClose={handleCloseModal}
      className={`${styles.Modal}`}
      overlayClassName={styles.Overlay}
    >
    <div className={styles.topModal}>
      <button onClick={handleCloseModal}>
        <svg className={styles.xSVG}>
        <path className={styles.xPath} d='m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22' />
          </svg>
      </button>

      <h1 className={styles.modalHeader}>Save to list</h1>
      <a className={styles.subHeader}>Create New List</a>
      <div>
      <table className={styles.table}>
        <tbody>
          {
            Object.keys(lists).map((key) => {
              return <List isHeart={lists[key]} name={key} handleHeartToggle={handleHeartToggle} />
            })
          }
           
        </tbody>
      </table>
      </div>
      </div>

      <MiniListing data={data}/>
    </ReactModal>
  )

  
}

const List = ({isHeart, name, handleHeartToggle}) => {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.rowName}>{name}</td>
      <td className={styles.rowHeartContainer}>
        <svg className={isHeart ? styles.rowHeart : styles.emptyRowHeart}>
            <path onClick={()=> {handleHeartToggle(name)}} className={isHeart ? styles.rowHeartPath : styles.emptyRowHeartPath} d='m 23.99 2.75 c -0.3 0 -0.6 0.02 -0.9 0.05 c -1.14 0.13 -2.29 0.51 -3.41 1.14 c -1.23 0.68 -2.41 1.62 -3.69 2.94 c -1.28 -1.32 -2.46 -2.25 -3.69 -2.94 c -1.12 -0.62 -2.27 -1 -3.41 -1.14 a 7.96 7.96 0 0 0 -0.9 -0.05 c -1.88 0 -7.26 1.54 -7.26 8.38 c 0 7.86 12.24 16.33 14.69 17.95 a 1 1 0 0 0 1.11 0 c 2.45 -1.62 14.69 -10.09 14.69 -17.95 c 0 -6.84 -5.37 -8.38 -7.26 -8.38' />
        </svg>
      </td>
    </tr>
  )
}



export default Listing; 