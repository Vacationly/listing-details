import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import { functions } from '../../utils';

import styles from './Description.css';

const { expandCollapse } = functions;

export default class Description extends React.Component {
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
      () => expandCollapse(styles.moreWrapper, styles.moreContent, this.state.expanded),
    );
  }

  render() {
    const { more } = this.props.description;
    const { expanded } = this.state;
    const description = <DescriptionContent {...this.props} />;
    const linkVariant = expanded ? 'Hide' : 'Read more about the space';
    const link = more.length ? linkVariant : null;
    return (
      <div>
        <Section
          content={description}
          link={link}
          action={this.toggleMoreInfo}
          expandable
          expanded={expanded}
        />
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.shape({
    main: PropTypes.string.isRequired,
    more: PropTypes.array.isRequired,
  }).isRequired,
};

const DescriptionContent = (props) => {
  const { main, more } = props.description;
  return (
    <div>
      <div>
        {main}
      </div>
      <div className={styles.moreWrapper}>
        <div className={styles.moreContent}>
          {more.map(info => (
            <Section
              subtitle={info.title}
              content={(
                <div>
                  {info.text}
                </div>
)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

DescriptionContent.propTypes = {
  description: PropTypes.shape({
    main: PropTypes.string.isRequired,
    more: PropTypes.array.isRequired,
  }).isRequired,
};
