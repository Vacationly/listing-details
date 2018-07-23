import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import Modal from './Modal';

const validProps = {
  title: 'Testing',
  content: <div />,
  dismiss() {
    return true;
  },
};

const invalidProps = {
  title: 'Testing',
  content: 'Div',
  dismiss() {
    return true;
  },
};

const clickEvent = {
  stopPropagation() {
    return true;
  },
};

describe('interaction', () => {
  let dismiss;
  beforeEach(() => {
    dismiss = sinon.spy(validProps, 'dismiss');
  });
  afterEach(() => {
    dismiss.restore();
  });
  it('should call dismiss once when clicking the x in the top left corner', () => {
    const wrapper = shallow(<Modal {...validProps} />);
    const target = wrapper.find('#dismiss');
    target.className = 'dismiss';
    clickEvent.target = target;
    target.simulate('click', clickEvent);
    expect(dismiss.callCount).toBe(1);
  });
  it('should call dismiss once when clicking the backdrop', () => {
    const wrapper = shallow(<Modal {...validProps} />);
    const target = wrapper.find('#backdrop');
    target.className = 'backdrop';
    clickEvent.target = target;
    target.simulate('click', clickEvent);
    expect(dismiss.callCount).toBe(1);
  });
  it('should call dismiss zero times when clicking the frame', () => {
    const wrapper = shallow(<Modal {...validProps} />);
    const target = wrapper.find('#frame');
    target.className = 'frame';
    clickEvent.target = target;
    target.simulate('click', clickEvent);
    expect(dismiss.callCount).toBe(0);
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
  it('should throw an error when given a prop of invalid type', () => {
    shallow(<Modal {...invalidProps} />);
    expect(error.callCount).toBe(1);
  });
});
