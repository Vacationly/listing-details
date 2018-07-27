import React from 'react';
import PropTypes from 'prop-types';
import Expandable from '../Utilities/Expandable/Expandable';
import { constants } from '../utils';

import styles from './HouseRules.css';

const { houseRulesThreshold } = constants;

export default class HouseRules extends React.Component {
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
    const { houseRules } = this.props;
    const { expanded } = this.state;
    const link = expanded ? 'Hide' : 'Read all rules';
    const rulesMain = <RulesMain {...this.props} />;
    const rulesMore = <RulesMore {...this.props} />;
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

HouseRules.propTypes = {
  houseRules: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const RulesMain = (props) => {
  const { houseRules } = props;
  return (
    <div>
      {houseRules.map(
        (rule, index) => index < houseRulesThreshold && (
        <div key={`rule_${index}`} className={styles.ruleItem}>
          {rule}
        </div>
        ),
      )}
    </div>
  );
};

RulesMain.propTypes = {
  houseRules: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const RulesMore = (props) => {
  const { houseRules } = props;
  return (
    <div>
      {houseRules.map(
        (rule, index) => index >= houseRulesThreshold && (
        <div key={`rule_${index}`} className={styles.ruleItem}>
          {rule}
        </div>
        ),
      )}
    </div>
  );
};

RulesMore.propTypes = {
  houseRules: PropTypes.arrayOf(PropTypes.string).isRequired,
};
