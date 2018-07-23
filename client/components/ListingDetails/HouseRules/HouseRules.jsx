import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import { constants, functions } from '../../utils';

import styles from './HouseRules.css';

const { houseRulesThreshold } = constants;
const { expandCollapse } = functions;

export default class HouseRules extends React.Component {
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
    const { houseRules } = this.props;
    const { expanded } = this.state;
    const link = expanded ? 'Hide' : 'Read all rules';
    const rulesList = <RulesList {...this.props} />;
    return (
      <div>
        {houseRules.length && (
          <Section
            title="House rules"
            content={rulesList}
            link={houseRules.length > houseRulesThreshold ? link : null}
            action={this.toggleMoreInfo}
            expandable
            expanded={expanded}
          />
        )}
      </div>
    );
  }
}

HouseRules.propTypes = {
  houseRules: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const RulesList = (props) => {
  const { houseRules } = props;
  return (
    <div>
      {houseRules.map(
        (rule, index) => index < houseRulesThreshold && (
        <div className={styles.ruleItem}>
          {rule}
        </div>
        ),
      )}
      <div className={styles.moreWrapper}>
        <div className={styles.moreContent}>
          {houseRules.map(
            (rule, index) => index >= houseRulesThreshold && (
            <div className={styles.ruleItem}>
              {rule}
            </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

RulesList.propTypes = {
  houseRules: PropTypes.arrayOf(PropTypes.string).isRequired,
};
