import React from 'react';
import PropTypes from 'prop-types';

import styles from './Highlights.css';

const Highlights = (props) => {
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

Highlights.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tagline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

module.exports = Highlights;
