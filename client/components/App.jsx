import axios from 'axios';
import React from 'react';

import Summary from './Summary/Summary';
import Highlights from './Highlights/Highlights';
import Description from './Description/Description';
import Amenities from './Amenities/Amenities';
import SleepingArrangements from './SleepingArrangements/SleepingArrangements';
import HouseRules from './HouseRules/HouseRules';
import CancellationPolicy from './CancellationPolicy/CancellationPolicy';
import VideoPlayer from './VideoPlayer/VideoPlayer';

import { constants } from './utils';

import styles from './App.css';

const { apiEndpoint, dummyListing } = constants;

const getListingIdFromUrl = () => parseInt(window.location.pathname.split('listing/')[1]) || 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.saveFeedbackData = this.saveFeedbackData.bind(this);
    this.state = {
      listingData: {},
      dataReady: false,
    };
  }

  componentDidMount() {
    const listingId = getListingIdFromUrl();
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
      videoSource,
    } = listingData;
    if (dataReady) {
      return (
        <div className={styles.detailsContainer}>
          <Summary {...listingData} />
          {highlights && <Highlights {...listingData} saveFeedback={this.saveFeedbackData} />}
          {description && <Description {...listingData} />}
          {amenities && <Amenities {...listingData} />}
          {sleepingArrangements && <SleepingArrangements {...listingData} />}
          {houseRules && <HouseRules {...listingData} />}
          {cancellationPolicy && <CancellationPolicy {...listingData} />}
          {videoSource && <VideoPlayer {...listingData} />}
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
