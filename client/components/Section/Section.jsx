import React from 'react';
import PropTypes from 'prop-types';

import styles from './Section.css';

const Section = (props) => {
  const {
    title, content, link, action,
  } = props;
  return (
    <div className={styles.section}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.content}>
        {content}
      </div>
      <div className={styles.link} onClick={action} onKeyDown={action} tabIndex="0" role="link">
        {link}
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  link: PropTypes.string,
  action: PropTypes.func,
};

Section.defaultProps = {
  link: null,
  action: null,
};

module.exports = Section;
