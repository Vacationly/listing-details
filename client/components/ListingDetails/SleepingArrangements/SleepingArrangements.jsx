import React from 'react';
import PropTypes from 'prop-types';

import Section from '../../Utilities/Section/Section';
import { constants, functions } from '../../utils';
import styles from './SleepingArrangements.css';

const { sleepingArrangementsThreshold } = constants;
const { expandCollapse } = functions;

export default class SleepingArrangements extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      expanded: false,
    };
  }

  toggleMoreInfo() {
    this.setState(
      prevState => ({ expanded: !prevState.expanded }),
      () => {
        expandCollapse(styles.moreWrapper, styles.moreContent, this.state.expanded);
      },
    );
  }

  render() {
    const { sleepingArrangements } = this.props;
    const { expanded } = this.state;
    const link = expanded ? 'Hide' : 'Show all';
    const sleepingArrangementsList = <SleepingArrangementsList {...this.props} />;
    return (
      <div>
        {sleepingArrangements.length && (
          <Section
            title="Sleeping arrangements"
            content={sleepingArrangementsList}
            link={sleepingArrangements.length > sleepingArrangementsThreshold ? link : null}
            action={this.toggleMoreInfo}
            expandable
            expanded={expanded}
          />
        )}
      </div>
    );
  }
}

SleepingArrangements.propTypes = {
  sleepingArrangements: PropTypes.arrayOf(
    PropTypes.shape({
      spaceName: PropTypes.string.isRequired,
      mattressType: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const SleepingArrangementsList = (props) => {
  const { sleepingArrangements } = props;
  return (
    <div>
      <div className={styles.sleepingArrangements}>
        {sleepingArrangements.map(
          (sleepingArrangement, index) => index < sleepingArrangementsThreshold && (
          <SleepingArrangement {...{ sleepingArrangement }} />
          ),
        )}
      </div>
      <div className={styles.moreWrapper}>
        <div className={`${styles.moreContent} ${styles.sleepingArrangements}`}>
          {sleepingArrangements.map(
            (sleepingArrangement, index) => index >= sleepingArrangementsThreshold && (
            <SleepingArrangement {...{ sleepingArrangement }} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

SleepingArrangementsList.propTypes = {
  sleepingArrangements: PropTypes.arrayOf(
    PropTypes.shape({
      spaceName: PropTypes.string.isRequired,
      mattressType: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const SleepingArrangement = (props) => {
  const { sleepingArrangement } = props;
  return (
    <div className={styles.sleepingArrangement}>
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
  );
};

SleepingArrangement.propTypes = {
  sleepingArrangement: PropTypes.shape({
    spaceName: PropTypes.string.isRequired,
    mattressType: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
};
