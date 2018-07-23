import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../Utilities/Section/Section';
import styles from './SleepingArrangements.css';

const SleepingArrangements = (props) => {
  const { sleepingArrangements } = props;
  const sleepingArrangementsTiles = (
    <div className={styles.sleepingArrangementTiles}>
      {sleepingArrangements.map(sleepingArrangement => (
        <div className={styles.sleepingArrangementTile}>
          <div className={styles.spaceName}>
            {sleepingArrangement.spaceName}
          </div>
          <div className={styles.mattressType}>
            {sleepingArrangement.number}
            {' '}
            {sleepingArrangement.mattressType}
            {sleepingArrangement.number !== 1 && 's'}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Section title="Sleeping arrangements" content={sleepingArrangementsTiles} />
    </div>
  );
};

SleepingArrangements.propTypes = {
  sleepingArrangements: PropTypes.arrayOf(
    PropTypes.shape({
      spaceName: PropTypes.string.isRequired,
      mattressType: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

module.exports = SleepingArrangements;
