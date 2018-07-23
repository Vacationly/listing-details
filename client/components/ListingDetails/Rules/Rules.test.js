import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import Rules from './Rules';

import { constants } from '../../utils';

const generateRules = (numRules) => {
  const rules = [];
  for (let i = 0; i < numRules; i++) {
    rules.push('placeholder');
  }
  return rules;
};

const emptyProps = {
  rules: [],
};

const incompleteProps = {
  rules: generateRules(1),
};

const completeProps = {
  rules: generateRules(constants.rulesThreshold + 1),
};

describe('rendering', () => {
  it('should NOT render Section component when there are no rules', () => {
    const wrapper = mount(<Rules {...emptyProps} />);
    const target = wrapper.find('#title');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when there are no rules', () => {
    const error = sinon.spy(console, 'error');
    mount(<Rules {...emptyProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
  it('should NOT display action link when there is only one rule', () => {
    const wrapper = mount(<Rules {...incompleteProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should display action link when there are many rules', () => {
    const wrapper = mount(<Rules {...completeProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
  });
});

describe('interaction', () => {
  it('action link should call "toggleMoreInfo"', () => {
    const toggleStub = sinon.stub(Rules.prototype, 'toggleMoreInfo');
    const wrapper = mount(<Rules {...completeProps} />);
    wrapper.find('#link').simulate('click');
    expect(toggleStub.callCount).toBe(1);
    toggleStub.restore();
  });
});
