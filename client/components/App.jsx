import React from 'react';
import axios from 'axios';

const apiBaseUrl = '/api/listings';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: {},
    };
  }

  componentDidMount() {
    this.getDataForListing();
  }

  getDataForListing(listingId = 1) {
    axios.get(`${apiBaseUrl}/${listingId}`).then((response) => {
      this.setState({ listingData: response.data });
    });
  }

  // PLACEHOLDER RENDER FUNCTION
  render() {
    const { title, host } = this.state.listingData;
    if (title) {
      return (
        <div>
          {host.name}
        </div>
      );
    }
    return (
      <div>
Hello, world!
      </div>
    );
  }
}
