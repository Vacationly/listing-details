import React from 'react';
import PropTypes from 'prop-types';

import Expandable from '../Utilities/Expandable/Expandable';
import { constants } from '../../utils';
import styles from './SleepingArrangements.css';

const { sleepingArrangementsThreshold } = constants;

export default class SleepingArrangements extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      expanded: false,
    };
  }

  toggleMoreInfo(callback) {
    this.setState(prevState => ({ expanded: !prevState.expanded }), callback);
  }

  render() {
    const { sleepingArrangements } = this.props;
    const { expanded } = this.state;
    const link = expanded ? 'Hide' : 'Show all';
    const sleepingArrangementsMain = (
      <SleepingArrangementsList
        sleepingArrangements={sleepingArrangements}
        start={0}
        end={sleepingArrangementsThreshold}
      />
    );
    const sleepingArrangementsMore = (
      <SleepingArrangementsList
        sleepingArrangements={sleepingArrangements}
        start={sleepingArrangementsThreshold}
        end={sleepingArrangements.length}
      />
    );
    return (
      <div>
        {sleepingArrangements.length && (
          <Expandable
            id="sleepingArrangements"
            title="Sleeping arrangements"
            main={sleepingArrangementsMain}
            more={sleepingArrangementsMore}
            link={sleepingArrangements.length > sleepingArrangementsThreshold ? link : null}
            toggle={this.toggleMoreInfo}
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
      spaceName: PropTypes.string,
      mattressType: PropTypes.string,
      number: PropTypes.number,
    }),
  ).isRequired,
};

const SleepingArrangementsList = (props) => {
  const { sleepingArrangements, start, end } = props;
  return (
    <div>
      <div className={styles.sleepingArrangements}>
        {sleepingArrangements.map(
          (sleepingArrangement, index) => index >= start
            && index < end && (
              <SleepingArrangement key={`sleeping_${index}`} {...{ sleepingArrangement }} />
          ),
        )}
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
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
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
    spaceName: PropTypes.string,
    mattressType: PropTypes.string,
    number: PropTypes.number,
  }).isRequired,
};
