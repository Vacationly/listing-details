import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import Descriptions from './Descriptions';

const emptyProps = {
  descriptions: {
    main: 'placeholder',
    more: [],
  },
};

const fullProps = {
  descriptions: {
    main: 'placeholder',
    more: [{ title: 'placeholder', value: 'placeholder' }],
  },
};

describe('rendering', () => {
  it('should NOT display action link when "more" prop is empty', () => {
    const wrapper = mount(<Descriptions {...emptyProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when "more" prop is empty', () => {
    const error = sinon.spy(console, 'error');
    mount(<Descriptions {...emptyProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
  it('should display action link when "more" prop is not empty', () => {
    const wrapper = mount(<Descriptions {...fullProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
  });
});

describe('interaction', () => {
  it('action link should call "toggleMoreInfo"', () => {
    const toggleStub = sinon.stub(Descriptions.prototype, 'toggleMoreInfo');
    const wrapper = mount(<Descriptions {...fullProps} />);
    wrapper.find('#link').simulate('click');
    expect(toggleStub.callCount).toBe(1);
  });
});
