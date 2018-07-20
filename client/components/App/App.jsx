import React from 'react';
import axios from 'axios';

import ListingSummary from '../ListingSummary/ListingSummary';

const apiBaseUrl = '/api/listings';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: 0,
      listingData: {},
      dataReady: false,
    };
  }

  componentDidMount() {
    this.getListingData();
  }

  getListingData() {
    axios.get(`${apiBaseUrl}/${this.state.listingId}`).then((response) => {
      this.setState({ listingData: response.data, dataReady: true });
    });
  }

  setListing(id) {
    if (id >= 0) {
      this.setState({ listingId: id }, this.getListingData.bind(this));
    }
  }

  render() {
    const {
      title,
      listingType,
      host,
      location,
      capacity,
      highlights,
      descriptions,
      amenities,
      sleepingArrangements,
      rules,
      cancellationType,
    } = this.state.listingData || {};
    if (this.state.dataReady) {
      return (
        <ListingSummary
          title={title || ''}
          listingType={listingType || {}}
          location={location || {}}
          capacity={capacity || {}}
          host={host || {}}
        />
      );
    }
    return (
      <div>
Hello, world!
      </div>
    );
  }
}
