import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../Utilities/Section/Section';
import styles from './SleepingArrangements.css';

const ListingSleepingArrangements = (props) => {
  const { sleepingArrangements } = props;
  const sleepingArrangementsTiles = (
    <div className={styles.sleepingArrangementTiles}>
      {sleepingArrangements.map(
        sleepingArrangement => sleepingArrangement.number > 0 && (
        <div className={styles.sleepingArrangementTile}>
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

  return <Section title="Sleeping arrangements" content={sleepingArrangementsTiles} />;
};

ListingSleepingArrangements.propTypes = {
  sleepingArrangements: PropTypes.arrayOf(
    PropTypes.shape({
      spaceName: PropTypes.string.isRequired,
      mattressType: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

module.exports = ListingSleepingArrangements;
