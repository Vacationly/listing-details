import axios from 'axios';
import React from 'react';

import Summary from '../ListingDetails/Summary/Summary';
import Highlights from '../ListingDetails/Highlights/Highlights';
import Description from '../ListingDetails/Description/Description';
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
    const windowPath = window.location.pathname.split('/listings');
    const listingId = parseInt(windowPath[0], 10) || 0;
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
    const { listingData } = this.state;
    const {
      highlights,
      description,
      amenities,
      sleepingArrangements,
      rules,
      cancellationPolicy,
    } = listingData;
    if (this.state.dataReady) {
      return (
        <div>
          <Summary {...listingData} />
          {highlights && (
            <Highlights highlights={highlights} saveFeedback={this.saveFeedbackData} />
          )}
          {description && <Description {...listingData} />}
          {amenities && <Amenities {...listingData} />}
          {sleepingArrangements && <SleepingArrangements {...listingData} />}
          {rules && <Rules {...listingData} />}
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
