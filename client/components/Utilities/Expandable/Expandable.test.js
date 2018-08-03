import React from 'react';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Expandable from './Expandable';

const validProps = {
  id: 'Id',
  title: 'Testing',
  main: <div />,
  more: <div />,
  link: 'Show',
  toggle() {
    return true;
  },
};

const partialProps1 = {
  id: 'Id',
  title: 'Testing',
  main: <div />,
  more: <div />,
};

const partialProps2 = {
  id: 'Id',
  title: 'Testing',
  main: <div />,
  link: 'Show',
  toggle() {
    return true;
  },
};

const invalidProps = {
  id: 'Id',
  title: 'Testing',
  main: 'Div',
  toggle() {
    return true;
  },
};

const incompleteProps = {
  title: 'Testing',
  main: <div />,
  toggle() {
    return true;
  },
};

const clickEvent = {
  stopPropagation() {
    return true;
  },
};

describe('interaction', () => {
  let toggle;
  beforeEach(() => {
    toggle = sinon.stub(validProps, 'toggle');
  });
  afterEach(() => {
    toggle.restore();
  });
  it('should call toggle once when link is clicked', () => {
    const wrapper = mount(<Expandable {...validProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
    target.simulate('click', clickEvent);
    expect(toggle.callCount).toBe(1);
  });
});

describe('rendering', () => {
  it('should not create a #link element when no "link" prop is given', () => {
    const wrapper = mount(<Expandable {...partialProps1} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should not create a #link element when no "more" prop is given', () => {
    const wrapper = mount(<Expandable {...partialProps2} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
});

describe('validation', () => {
  let error;
  beforeEach(() => {
    error = sinon.stub(console, 'error');
  });
  afterEach(() => {
    error.restore();
  });
  it('should throw an error when given a prop of invalid type', () => {
    shallow(<Expandable {...invalidProps} />);
    expect(error.callCount).toBe(1);
  });
  it('should throw an error when not given a required prop', () => {
    shallow(<Expandable {...incompleteProps} />);
    expect(error.callCount).toBe(1);
  });
});
