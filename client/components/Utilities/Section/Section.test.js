import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import Section from './Section';

const completeProps = {
  title: 'title',
  subtitle: 'subtitle',
  content: <div />,
  link: 'link',
  expandable: true,
  expanded: false,
  action() {
    return true;
  },
};

const incompleteProps = {
  title: 'title',
};

const invalidProps = {
  title: 'title',
  subtitle: 'subtitle',
  content: 'div',
  link: 'link',
  expandable: true,
  expanded: false,
  action() {
    return true;
  },
};

describe('rendering', () => {
  it('should not display a link when no action is given', () => {
    const newProps = Object.assign({}, completeProps);
    newProps.action = null;
    const wrapper = shallow(<Section {...newProps} />);
    const link = wrapper.find('#link');
    expect(link.length).toBe(0);
  });
  it('should change icons when value of "expanded" changes', () => {
    let wrapper = shallow(<Section {...completeProps} />);
    const oldIcon = wrapper.find('#icon');
    const newProps = Object.assign({}, completeProps);
    newProps.expanded = true;
    wrapper = shallow(<Section {...newProps} />);
    const newIcon = wrapper.find('#icon');
    expect(newIcon).not.toEqual(oldIcon);
  });
});

describe('interaction', () => {
  let action;
  beforeEach(() => {
    action = sinon.spy(completeProps, 'action');
  });
  afterEach(() => {
    action.restore();
  });
  it('should call action once when clicking the link', () => {
    const wrapper = shallow(<Section {...completeProps} />);
    const target = wrapper.find('#link');
    target.simulate('click');
    expect(action.callCount).toBe(1);
  });
});

describe('validation', () => {
  let error;
  beforeEach(() => {
    error = sinon.spy(console, 'error');
  });
  afterEach(() => {
    error.restore();
  });
  it('should NOT throw an error when given only some props', () => {
    shallow(<Section {...incompleteProps} />);
    expect(error.callCount).toBe(0);
  });
  it('should throw an error when given a prop of invalid type', () => {
    shallow(<Section {...invalidProps} />);
    expect(error.callCount).toBe(1);
  });
});
