import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Utilities/Section/Section';
import Expandable from '../Utilities/Expandable/Expandable';

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
    const moreContent = <DescriptionMore description={more} />;
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
          <Section key={`description_${info.title}`} subtitle={info.title}>
            <div>
              {info.text}
            </div>
          </Section>
        ))}
    </div>
  );
};

DescriptionMore.propTypes = {
  more: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }))
    .isRequired,
};
