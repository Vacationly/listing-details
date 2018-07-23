import axios from 'axios';
import React from 'react';

import Summary from '../ListingDetails/Summary/Summary';
import Highlights from '../ListingDetails/Highlights/Highlights';
import Descriptions from '../ListingDetails/Descriptions/Descriptions';
import Amenities from '../ListingDetails/Amenities/Amenities';
import SleepingArrangements from '../ListingDetails/SleepingArrangements/SleepingArrangements';
import Rules from '../ListingDetails/Rules/Rules';
import CancellationPolicy from '../ListingDetails/CancellationPolicy/CancellationPolicy';
import { constants } from '../utils';

import './App.css';

const { apiEndpoint, dummyListing } = constants;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.saveFeedbackData = this.saveFeedbackData.bind(this);
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

  getListingData(listingId) {
    axios.get(`${apiEndpoint}/${listingId}`).then(
      (response) => {
        this.setState({ listingData: response.data, dataReady: true });
      },
      () => {
        this.setState({ listingData: dummyListing, dataReady: true });
      },
    );
  }

  saveFeedbackData(id, value) {
    axios
      .put(`${apiEndpoint}/${this.state.listingData.listingId}/highlights/${id}`, {
        feedback: value,
      })
      .then(() => {}, err => console.log('Error updating database', err));
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
    } = this.state.listingData;
    if (this.state.dataReady) {
      return (
        <div>
          <Summary
            title={title}
            listingType={listingType}
            location={location}
            capacity={capacity}
            host={host}
          />
          {highlights && (
            <Highlights highlights={highlights} saveFeedback={this.saveFeedbackData} />
          )}
          {descriptions && <Descriptions descriptions={descriptions} />}
          {amenities && <Amenities amenities={amenities} />}
          {sleepingArrangements && (
            <SleepingArrangements sleepingArrangements={sleepingArrangements} />
          )}
          {rules && <Rules rules={rules} />}
          {cancellationPolicy && <CancellationPolicy cancellationPolicy={cancellationPolicy} />}
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
