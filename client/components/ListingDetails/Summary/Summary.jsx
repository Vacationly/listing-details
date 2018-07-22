import React from 'react';
import PropTypes from 'prop-types';

import styles from './Summary.css';

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
            {host.name}
          </span>
        </div>
      </div>
      <div className={styles.capacity}>
        {capacity.map(field => (
          <span>
            {field.name}
            :
            {field.value}
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
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = Summary;
