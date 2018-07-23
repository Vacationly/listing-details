import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import Modal from './Modal';

describe('Modal dismissal', () => {
  const props = {
    title: 'Testing',
    content: <div />,
    dismiss() {
      return true;
    },
  };
  const clickEvent = {
    stopPropagation() {
      return true;
    },
  };
  const dismiss = sinon.spy(props, 'dismiss');

  afterEach(() => {
    dismiss.resetHistory();
  });

  it('should call dismiss once when clicking the x in the top left corner', () => {
    const wrapper = shallow(<Modal {...props} />);
    const target = wrapper.find('#dismiss');
    target.className = 'dismiss';
    clickEvent.target = target;
    target.simulate('click', clickEvent);
    expect(dismiss.callCount).toBe(1);
  });

  it('should call dismiss once when clicking the backdrop', () => {
    const wrapper = shallow(<Modal {...props} />);
    const target = wrapper.find('#backdrop');
    target.className = 'backdrop';
    clickEvent.target = target;
    target.simulate('click', clickEvent);
    expect(dismiss.callCount).toBe(1);
  });

  it('should call dismiss zero times when clicking the frame', () => {
    const wrapper = shallow(<Modal {...props} />);
    const target = wrapper.find('#frame');
    target.className = 'frame';
    clickEvent.target = target;
    target.simulate('click', clickEvent);
    expect(dismiss.callCount).toBe(0);
  });
});

describe('PropType errors', () => {
  const props = {
    title: 'Testing',
    content: 'Div',
    dismiss() {
      return true;
    },
  };
  const error = sinon.spy(console, 'error');
  it('should throw an error when given a prop of invalid type', () => {
    shallow(<Modal {...props} />);
    expect(error.callCount).toBe(1);
  });
});
