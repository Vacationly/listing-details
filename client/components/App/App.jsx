import axios from 'axios';
import React from 'react';

import Summary from '../ListingDetails/Summary/Summary';
import Descriptions from '../ListingDetails/Descriptions/Descriptions';
import Amenities from '../ListingDetails/Amenities/Amenities';
import SleepingArrangements from '../ListingDetails/SleepingArrangements/SleepingArrangements';
import Rules from '../ListingDetails/Rules/Rules';
import CancellationPolicy from '../ListingDetails/CancellationPolicy/CancellationPolicy';

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
      cancellationPolicy,
    } = this.state.listingData || {};
    if (this.state.dataReady) {
      console.log(this.state.listingData);
      return (
        <div>
          <Summary
            title={title}
            listingType={listingType}
            location={location}
            capacity={capacity}
            host={host}
          />
          <Descriptions descriptions={descriptions} />
          <hr />
          <Amenities amenities={amenities} />
          <hr />
          <SleepingArrangements sleepingArrangements={sleepingArrangements} />
          <hr />
          <Rules rules={rules} />
          <hr />
          <CancellationPolicy cancellationPolicy={cancellationPolicy} />
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
