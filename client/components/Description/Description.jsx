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
    const { description } = this.props;
    const { expanded } = this.state;
    const main = <DescriptionMain {...this.props} />;
    const more = <DescriptionMore {...this.props} />;
    const link = expanded ? 'Hide' : 'Read more about the space';
    return (
      <Expandable
        id="description"
        main={main}
        more={more}
        link={description.more.length ? link : null}
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
  const {
    description: { main },
  } = props;
  return (
    <div>
      {main}
    </div>
  );
};

DescriptionMain.propTypes = {
  description: PropTypes.shape({
    main: PropTypes.string,
  }).isRequired,
};

const DescriptionMore = (props) => {
  const {
    description: { more },
  } = props;
  return (
    <div>
      {more.map(info => (
        <Section
          key={`description_${info.title}`}
          subtitle={info.title}
          content={(
            <div>
              {info.text}
            </div>
)}
        />
      ))}
    </div>
  );
};

DescriptionMore.propTypes = {
  description: PropTypes.shape({
    more: PropTypes.array,
  }).isRequired,
};
