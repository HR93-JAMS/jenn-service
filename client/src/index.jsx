import React from 'react';
import ReactDOM from 'react-dom';

class SimilarListings extends React.Component {

    constructor(props) {
      super(props);
    }

    render () {
      return (
        <div>Hello World
        </div>
      )
    };

}

ReactDOM.render(<SimilarListings />, document.getElementById('similarListing'));