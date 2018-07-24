import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import Collapsible from '../../Utilities/Collapsible/Collapsible';

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
      <Collapsible
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
    main: PropTypes.string.isRequired,
    more: PropTypes.array.isRequired,
  }).isRequired,
};

const DescriptionMain = (props) => {
  const { main } = props.description;
  return (
    <div>
      {main}
    </div>
  );
};

DescriptionMain.propTypes = {
  description: PropTypes.shape({
    main: PropTypes.string.isRequired,
  }).isRequired,
};

const DescriptionMore = (props) => {
  const { more } = props.description;
  return (
    <div>
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
  );
};

DescriptionMore.propTypes = {
  description: PropTypes.shape({
    more: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
