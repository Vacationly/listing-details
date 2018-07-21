import React from 'react';
import axios from 'axios';

import ListingSummary from '../ListingSummary/ListingSummary';
import ListingDescriptions from '../ListingDescriptions/ListingDescriptions';
import ListingAmenities from '../ListingAmenities/ListingAmenities';
import ListingSleepingArrangements from '../ListingSleepingArrangements/ListingSleepingArrangements';

const apiBaseUrl = '/api/listings';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: {},
      dataReady: false,
    };
  }

  componentDidMount() {
    const windowPath = window.location.pathname.split('/');
    const listingId = parseInt(windowPath[windowPath.length - 2]) || 0;
    this.getListingData(listingId);
  }

  getListingData(id) {
    axios.get(`${apiBaseUrl}/${id}`).then((response) => {
      this.setState({ listingData: response.data, dataReady: true });
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
    } = this.state.listingData || {};
    if (this.state.dataReady) {
      return (
        <div>
          <ListingSummary
            title={title}
            listingType={listingType}
            location={location}
            capacity={capacity}
            host={host}
          />
          <ListingDescriptions descriptions={descriptions} />
          <hr />
          <ListingAmenities amenities={amenities} />
          <hr />
          <ListingSleepingArrangements sleepingArrangements={sleepingArrangements} />
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
