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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { listing } = props;
    this.state = {
      listingData: listing || dummyListing,
    };
    this.saveFeedbackData = this.saveFeedbackData.bind(this);
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
        <div id="Details">
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
