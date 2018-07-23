import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import Modal from './Modal';

describe('Modal is dismissed correctly', () => {
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
