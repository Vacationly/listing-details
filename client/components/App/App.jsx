import axios from 'axios';
import React from 'react';

import Summary from '../ListingDetails/Summary/Summary';
import Highlights from '../ListingDetails/Highlights/Highlights';
import Description from '../ListingDetails/Description/Description';
import Amenities from '../ListingDetails/Amenities/Amenities';
import SleepingArrangements from '../ListingDetails/SleepingArrangements/SleepingArrangements';
import HouseRules from '../ListingDetails/HouseRules/HouseRules';
import CancellationPolicy from '../ListingDetails/CancellationPolicy/CancellationPolicy';
import { constants } from '../utils';

import styles from './App.css';

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
    const windowPath = window.location.pathname.split('listing/');
    const listingId = parseInt(windowPath[1], 10) || 0;
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
    const {
      listingData: { listingId },
    } = this.state;
    axios.put(`${apiEndpoint}/${listingId}/highlights/${id}`, {
      feedback: value,
    });
  }

  render() {
    const { listingData, dataReady } = this.state;
    const {
      highlights,
      description,
      amenities,
      sleepingArrangements,
      houseRules,
      cancellationPolicy,
    } = listingData;
    if (dataReady) {
      return (
        <div className={styles.container}>
          <Summary {...listingData} />
          {highlights && (
            <Highlights highlights={highlights} saveFeedback={this.saveFeedbackData} />
          )}
          {description && <Description {...listingData} />}
          {amenities && <Amenities {...listingData} />}
          {sleepingArrangements && <SleepingArrangements {...listingData} />}
          {houseRules && <HouseRules {...listingData} />}
          {cancellationPolicy && <CancellationPolicy {...listingData} />}
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
