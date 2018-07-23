import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import CancellationPolicy from './CancellationPolicy';

const emptyProps = {
  cancellationPolicy: {
    name: '',
    overview: '',
    description: '',
  },
};

const incompleteProps = {
  cancellationPolicy: {
    name: 'placeholder',
    overview: 'placeholder',
    description: '',
  },
};

const completeProps = {
  cancellationPolicy: {
    name: 'placeholder',
    overview: 'placeholder',
    description: 'placeholder',
  },
};

describe('rendering', () => {
  it('should NOT render component when all props are empty', () => {
    const wrapper = mount(<CancellationPolicy {...emptyProps} />);
    const target = wrapper.find('#title');
    expect(target.length).toBe(0);
  });
  it('should NOT display action link when "description" prop is empty', () => {
    const wrapper = mount(<CancellationPolicy {...incompleteProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when "description" prop is empty', () => {
    const error = sinon.spy(console, 'error');
    mount(<CancellationPolicy {...incompleteProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
  it('should display action link when "description" prop is not empty', () => {
    const wrapper = mount(<CancellationPolicy {...completeProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
  });
});

describe('interaction', () => {
  it('action link should call "toggleModal"', () => {
    const toggleStub = sinon.stub(CancellationPolicy.prototype, 'toggleModal');
    const wrapper = mount(<CancellationPolicy {...completeProps} />);
    wrapper.find('#link').simulate('click');
    expect(toggleStub.callCount).toBe(1);
    toggleStub.restore();
  });
});
