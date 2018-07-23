import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import Description from './Description';

const emptyProps = {
  description: {
    main: 'placeholder',
    more: [],
  },
};

const completeProps = {
  description: {
    main: 'placeholder',
    more: [{ title: 'placeholder', value: 'placeholder' }],
  },
};

describe('rendering', () => {
  it('should NOT display action link when "more" prop is empty', () => {
    const wrapper = mount(<Description {...emptyProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when "more" prop is empty', () => {
    const error = sinon.spy(console, 'error');
    mount(<Description {...emptyProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
  it('should display action link when "more" prop is not empty', () => {
    const wrapper = mount(<Description {...completeProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
  });
});

describe('interaction', () => {
  it('action link should call "toggleMoreInfo"', () => {
    const toggleStub = sinon.stub(Description.prototype, 'toggleMoreInfo');
    const wrapper = mount(<Description {...completeProps} />);
    wrapper.find('#link').simulate('click');
    expect(toggleStub.callCount).toBe(1);
    toggleStub.restore();
  });
});
