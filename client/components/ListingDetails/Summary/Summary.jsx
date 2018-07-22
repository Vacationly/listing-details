import React from 'react';
import PropTypes from 'prop-types';
import { constants } from '../../utils';

import styles from './Summary.css';

const { imagesEndpoint } = constants;
const imageSources = {
  Bed: `${imagesEndpoint}/bed.png`,
  Bath: `${imagesEndpoint}/bath.png`,
  Bedroom: `${imagesEndpoint}/bedroom.png`,
  Guest: `${imagesEndpoint}/guest.png`,
};

const Summary = (props) => {
  const {
    title, listingType, location, capacity, host,
  } = props;
  return (
    <div className={styles.listingSummary}>
      <div className={styles.listingType}>
        {listingType.value.toLowerCase()}
      </div>
      <div className={styles.headline}>
        <div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.city}>
            {location.city}
          </div>
        </div>
        <div className={styles.host}>
          <img src={host.avatar} className={styles.avatar} alt={host.name} />
          <span>
            {host.name.split(' ')[0]}
          </span>
        </div>
      </div>
      <div className={styles.capacity}>
        {capacity.map(field => (
          <span className={styles.capacityField}>
            <img src={imageSources[field.name]} alt={field.name} />
            {field.value}
            {' '}
            {field.value === 1 ? field.name : `${field.name}s`}
          </span>
        ))}
      </div>
    </div>
  );
};

Summary.propTypes = {
  title: PropTypes.string.isRequired,
  listingType: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  capacity: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = Summary;
