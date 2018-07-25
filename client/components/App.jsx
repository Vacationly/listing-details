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
import { constants } from './utils';

import styles from './App.css';

const { apiEndpoint, dummyListing } = constants;

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
    this.getListingData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getListingData(nextProps);
  }

  getListingData(props) {
    const {
      match: { params },
    } = props;
    const listingId = parseInt(params.listingId, 10) || 0;
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
        <div className={styles.detailsContainer}>
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

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      listingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};
