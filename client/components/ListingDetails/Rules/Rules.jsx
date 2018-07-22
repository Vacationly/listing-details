import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import { expandCollapse } from '../../../utils';

import styles from './Rules.css';

const rulesThreshold = 3;

export default class Rules extends React.Component {
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
    const { rules } = this.props;
    const { expanded } = this.state;
    const link = expanded ? 'Hide' : 'Read all rules';
    const rulesList = (
      <div>
        {rules.map(
          (rule, index) => index < rulesThreshold && (
          <div className={styles.ruleItem}>
            {rule}
          </div>
          ),
        )}
        <div className={styles.moreWrapper}>
          <div className={styles.moreContent}>
            {rules.map(
              (rule, index) => index >= rulesThreshold && (
              <div className={styles.ruleItem}>
                {rule}
              </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
    return (
      <Section
        title="House rules"
        content={rulesList}
        link={rules.length > 3 ? link : null}
        action={this.toggleMoreInfo}
      />
    );
  }
}

Rules.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.string).isRequired,
};
