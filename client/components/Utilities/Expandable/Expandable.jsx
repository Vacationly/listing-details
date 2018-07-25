import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section/Section';

import styles from './Expandable.css';

const toggleCollapse = (wrapperId, contentId, expanded) => {
  const wrapper = window.document.getElementById(wrapperId);
  const content = window.document.getElementById(contentId);
  wrapper.style.height = expanded ? `${content.clientHeight + content.style.margin}px` : '0px';
  wrapper.style.opacity = expanded ? 1 : 0;
  wrapper.style.overflow = expanded ? 'visible' : 'hidden';
};

const Expandable = (props) => {
  const {
    id, title, main, more, link, toggle, expanded,
  } = props;
  const toggleMoreInfo = () => {
    toggle(() => {
      toggleCollapse(`${id}_wrapper`, `${id}_content`, !expanded);
    });
  };
  const content = (
    <div>
      <div>
        {main}
      </div>
      <div id={`${id}_wrapper`} className={styles.moreWrapper}>
        <div id={`${id}_content`} className={styles.moreContent}>
          {more}
        </div>
      </div>
    </div>
  );
  return (
    <Section
      title={title}
      content={content}
      link={more ? link : null}
      action={toggleMoreInfo}
      expandable
      expanded={expanded}
    />
  );
};

Expandable.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  main: PropTypes.element,
  more: PropTypes.element,
  link: PropTypes.string,
  toggle: PropTypes.func,
  expanded: PropTypes.bool,
};

Expandable.defaultProps = {
  title: null,
  main: null,
  more: null,
  link: null,
  toggle: null,
  expanded: false,
};

module.exports = Expandable;
