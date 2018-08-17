import React from 'react';
import PropTypes from 'prop-types';
import Expandable from '../Utilities/Expandable/Expandable';
import { constants } from '../../utils';

import styles from './HouseRules.css';

const { houseRulesThreshold } = constants;

export default class HouseRules extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      expanded: false
    };
  }

  toggleMoreInfo(callback) {
    this.setState(prevState => ({ expanded: !prevState.expanded }), callback);
  }

  render() {
    const { houseRules } = this.props;
    const { expanded } = this.state;
    const link = expanded ? 'Hide' : 'Read all rules';
    const rulesMain = (
      <RulesList rules={houseRules} start={0} end={houseRulesThreshold} />
    );
    const rulesMore = (
      <RulesList
        rules={houseRules}
        start={houseRulesThreshold}
        end={houseRules.length}
      />
    );
    return (
      <div>
        {houseRules.length && (
          <Expandable
            id="houseRules"
            title="House rules"
            main={rulesMain}
            more={rulesMore}
            link={houseRules.length > houseRulesThreshold ? link : null}
            toggle={this.toggleMoreInfo}
            expandable
            expanded={expanded}
          />
        )}
      </div>
    );
  }
}

// HouseRules.propTypes = {
//   houseRules: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

const RulesList = props => {
  const { rules, start, end } = props;
  return (
    <div>
      {rules.map(
        (rule, index) =>
          index >= start &&
          index < end && (
            <div key={`rule_${index}`} className={styles.ruleItem}>
              {rule.rule}
            </div>
          )
      )}
    </div>
  );
};

RulesList.propTypes = {
  // rules: PropTypes.arrayOf(PropTypes.string).isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired
};
