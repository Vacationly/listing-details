import React from 'react';
import axios from 'axios';

import ListingSummary from './ListingSummary.jsx';

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
    } = this.state.listingData;
    if (title) {
      return (
        <ListingSummary
          title={title}
          listingType={listingType}
          location={location}
          capacity={capacity}
          host={host}
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
