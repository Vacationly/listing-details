import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../Utilities/Section/Section';
import styles from './SleepingArrangements.css';

const SleepingArrangements = (props) => {
  const { sleepingArrangements } = props;
  const sleepingArrangementsTiles = (
    <div className={styles.sleepingArrangementTiles}>
      {sleepingArrangements.map(
        (sleepingArrangement, index) => sleepingArrangement.number > 0 && (
        <div
          className={styles.sleepingArrangementTile}
          style={{ gridRow: Math.floor((index + 1) / 3), gridColumn: (index % 3) + 1 }}
        >
          <div className={styles.spaceName}>
            {sleepingArrangement.spaceName}
          </div>
          <div className={styles.mattressType}>
            {sleepingArrangement.number}
            {' '}
            {sleepingArrangement.mattressType}
            {sleepingArrangement.number > 1
                  && (sleepingArrangement.mattressType[sleepingArrangement.mattressType.length - 1]
                  === 's'
                    ? 'es'
                    : 's')}
          </div>
        </div>
        ),
      )}
    </div>
  );

  return (
    <div>
      <Section title="Sleeping arrangements" content={sleepingArrangementsTiles} />
      <hr />
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
