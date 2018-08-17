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

import { constants } from '../utils';

const { apiEndpoint, dummyListing } = constants;

const getListingIdFromUrl = () =>
  parseInt(window.location.pathname.split('listing/')[1], 10) || 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.saveFeedbackData = this.saveFeedbackData.bind(this);
    this.state = {
      listingData: {},
      dataReady: false
    };
  }

  componentDidMount() {
    const listingId = getListingIdFromUrl();
    this.getListingData(listingId);
  }

  getListingData(listingId) {
    axios.get(`${apiEndpoint}/${listingId}`).then(
      response => {
        console.log(response.data);
        this.setState({ listingData: response.data, dataReady: true });
      },
      () => {
        this.setState({ listingData: dummyListing, dataReady: true });
      }
    );
  }

  saveFeedbackData(id, value) {
    const {
      listingData: { listingId }
    } = this.state;
    axios.put(`${apiEndpoint}/${listingId}/highlights/${id}`, {
      feedback: value
    });
  }

  render() {
    const { listingData, dataReady } = this.state;
    const {
      highlights,
      amenities,
      sleepingArrangements,
      houseRules,
      cancellationPolicy,
      videoSource
    } = listingData;
    if (dataReady) {
      return (
        <div id="Details">
          <Summary {...listingData} />
          {highlights && (
            <Highlights
              highlights={highlights}
              saveFeedback={this.saveFeedbackData}
            />
          )}
          {
            <Description
              description={listingData.description}
              additionalDescription={listingData.additionaldescription}
            />
          }
          {amenities && <Amenities amenities={amenities} />}
          {sleepingArrangements && (
            <SleepingArrangements sleepingArrangements={sleepingArrangements} />
          )}
          {houseRules && <HouseRules houseRules={houseRules} />}
          {cancellationPolicy && (
            <CancellationPolicy cancellationPolicy={cancellationPolicy} />
          )}
          {videoSource && <VideoPlayer videoSource={videoSource} />}
        </div>
      );
    }
    return <div>Hello, world!</div>;
  }
}
