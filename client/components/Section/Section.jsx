import React from 'react';
import PropTypes from 'prop-types';

import styles from './Section.css';

const Section = (props) => {
  const {
    title, content, link, action,
  } = props;
  return (
    <div className={styles.section}>
      {title && (
      <div className={styles.title}>
        {title}
      </div>
      )}
      {content && (
      <div className={styles.content}>
        {content}
      </div>
      )}
      {link
        && action && (
          <div className={styles.link} onClick={action} onKeyDown={action} tabIndex="0" role="link">
            {link}
          </div>
      )}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  content: PropTypes.element,
  link: PropTypes.string,
  action: PropTypes.func,
};

Section.defaultProps = {
  title: null,
  content: null,
  link: null,
  action: null,
};

module.exports = Section;
