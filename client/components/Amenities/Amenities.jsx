import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Utilities/Section/Section';
import Modal from '../Utilities/Modal/Modal';
import { constants } from '../../utils';

import styles from './Amenities.css';

const { amenitiesThreshold } = constants;

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
    const amenitiesShort = (
      <AmenitiesList amenities={amenities} start={0} end={amenitiesThreshold} />
    );
    const amenitiesLong = <AmenitiesList {...this.props} start={0} end={amenities.length} />;
    const link = amenities.length > amenitiesThreshold ? `Show all ${amenities.length} amenities` : '';
    const action = amenities.length > amenitiesThreshold ? this.toggleModal : null;
    return (
      <div>
        {amenities.length && (
          <Section title="Amenities" link={link} action={action}>
            {amenitiesShort}
          </Section>
        )}
        {showModal && (
          <Modal title="Amenities" dismiss={this.toggleModal}>
            {amenitiesLong}
          </Modal>
        )}
      </div>
    );
  }
}

Amenities.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const AmenitiesList = (props) => {
  const { amenities, start, end } = props;
  return (
    <div className={styles.amenityList}>
      {amenities.map(
        (amenity, index) => index >= start
          && index < end && (
            <div key={`amenity_${index}`} className={styles.amenityItem}>
              <span>
                <img className={styles.icon} src={amenity.icon} alt={amenity.name} />
              </span>
              {amenity.name}
            </div>
        ),
      )}
    </div>
  );
};

AmenitiesList.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};
