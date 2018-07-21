import React from 'react';
import PropTypes from 'prop-types';

const Section = (props) => {
  const {
    title, content, link, action,
  } = props;
  return (
    <div>
      <div className="title">
        {title}
      </div>
      <div>
        {content}
      </div>
      <div className="link" onClick={action} onKeyDown={action} tabIndex="0" role="link">
        {link}
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

module.exports = Section;
