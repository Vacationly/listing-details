import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import Modal from '../../Utilities/Modal/Modal';

import styles from './Amenities.css';

const amenityThreshold = 6;
const getAmenitiesList = amenities => amenities.map(
  (amenity, index) => index < amenityThreshold && (
    <div className={`${styles.amenityItem} col${Math.floor(index / (amenityThreshold / 2))}`}>
      <span>
        <img className={styles.icon} src={amenity.icon} alt={amenity.value} />
      </span>
      {amenity.value}
    </div>
  ),
);
const createElement = (content, className) => (
  <div className={className}>
    {content}
  </div>
);

export default class Amenities extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { amenities } = this.props;
    const { showModal } = this.state;
    const amenitiesList = getAmenitiesList(amenities);
    const amenitiesShort = createElement(amenitiesList, styles.amenityList);
    const amenitiesLong = createElement(amenitiesList);
    const link = amenities.length > amenityThreshold ? `Show all ${amenities.length} amenities` : '';
    const action = amenities.length > amenityThreshold ? this.toggleModal : null;
    return (
      <div>
        <Section title="Amenities" content={amenitiesShort} link={link} action={action} />
        {showModal && (
          <Modal title="Amenities" content={amenitiesLong} dismiss={this.toggleModal} />
        )}
      </div>
    );
  }
}

Amenities.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
