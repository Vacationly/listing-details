import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

import Summary from './Summary/Summary';
import Highlights from './Highlights/Highlights';
import Description from './Description/Description';
import Amenities from './Amenities/Amenities';
import SleepingArrangements from './SleepingArrangements/SleepingArrangements';
import HouseRules from './HouseRules/HouseRules';
import CancellationPolicy from './CancellationPolicy/CancellationPolicy';
import VideoPlayer from './VideoPlayer/VideoPlayer';

import styles from './App.css';

import { constants } from '../utils';

const { apiEndpoint, dummyListing } = constants;

const getListingIdFromUrl = () => parseInt(window.location.pathname.split('listing/')[1], 10) || 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { listing } = props;
    this.state = {
      listingData: listing || dummyListing,
    };
    this.saveFeedbackData = this.saveFeedbackData.bind(this);
  }

  componentDidMount() {
    const listingId = getListingIdFromUrl();
    this.getListingData(listingId);
  }

  getListingData(listingId) {
    axios.get(`${apiEndpoint}/${listingId}`).then(
      (response) => {
        this.setState({ listingData: response.data });
      },
      () => {
        this.setState({ listingData: dummyListing });
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
    const { listingData } = this.state;
    const {
      highlights,
      description,
      amenities,
      sleepingArrangements,
      houseRules,
      cancellationPolicy,
      videoSource,
    } = listingData;
    if (listingData) {
      return (
        <div className={styles.Details}>
          <Summary {...listingData} />
          {highlights && (
            <Highlights highlights={highlights} saveFeedback={this.saveFeedbackData} />
          )}
          {description && <Description description={description} />}
          {amenities && <Amenities amenities={amenities} />}
          {sleepingArrangements && (
            <SleepingArrangements sleepingArrangements={sleepingArrangements} />
          )}
          {houseRules && <HouseRules houseRules={houseRules} />}
          {cancellationPolicy && <CancellationPolicy cancellationPolicy={cancellationPolicy} />}
          {videoSource && <VideoPlayer videoSource={videoSource} />}
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

App.propTypes = {
  listing: PropTypes.shape({
    title,
    listingType,
    host,
    capacity,
    highlights,
    description,
    amenities,
    sleepingArrangements,
    houseRules,
    cancellationPolicy,
    videoSource,
  }),
};

App.defaultProps = {
  listing: null,
};
