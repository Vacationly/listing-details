import React from 'react';
import PropTypes from 'prop-types';
import Expandable from '../Utilities/Expandable/Expandable';

import styles from './Description.css';

export default class Description extends React.Component {
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
    const {
      description: { main, more },
    } = this.props;
    const { expanded } = this.state;
    const mainContent = <DescriptionMain main={main} />;
    const moreContent = <DescriptionMore more={more} />;
    const link = expanded ? 'Hide' : 'Read more about the space';
    return (
      <Expandable
        id="description"
        main={mainContent}
        more={moreContent}
        link={more.length ? link : null}
        toggle={this.toggleMoreInfo}
        expandable
        expanded={expanded}
      />
    );
  }
}

Description.propTypes = {
  description: PropTypes.shape({
    main: PropTypes.string,
    more: PropTypes.array,
  }).isRequired,
};

const DescriptionMain = (props) => {
  const { main } = props;
  return (
    <div>
      {main}
    </div>
  );
};

DescriptionMain.propTypes = {
  main: PropTypes.string.isRequired,
};

const DescriptionMore = (props) => {
  const { more } = props;
  return (
    <div>
      {more
        && more.map(info => (
          <div key={`description_${info.title}`} className={styles.subsection}>
            <div className={styles.subtitle}>
              {info.title}
            </div>
            <div className={styles.content}>
              {info.text}
            </div>
          </div>
        ))}
    </div>
  );
};

DescriptionMore.propTypes = {
  more: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }))
    .isRequired,
};
