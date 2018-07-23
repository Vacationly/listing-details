import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import HouseRules from './HouseRules';

import { constants } from '../../utils';

const generateRules = (numRules) => {
  const houseRules = [];
  for (let i = 0; i < numRules; i++) {
    houseRules.push('placeholder');
  }
  return houseRules;
};

const emptyProps = {
  houseRules: [],
};

const incompleteProps = {
  houseRules: generateRules(1),
};

const completeProps = {
  houseRules: generateRules(constants.houseRulesThreshold + 1),
};

describe('rendering', () => {
  it('should NOT render Section component when there are no rules', () => {
    const wrapper = mount(<HouseRules {...emptyProps} />);
    const target = wrapper.find('#title');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when there are no rules', () => {
    const error = sinon.spy(console, 'error');
    mount(<HouseRules {...emptyProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
  it('should NOT display action link when there is only one rule', () => {
    const wrapper = mount(<HouseRules {...incompleteProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should display action link when there are many rules', () => {
    const wrapper = mount(<HouseRules {...completeProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
  });
});

describe('interaction', () => {
  it('action link should call "toggleMoreInfo"', () => {
    const toggleStub = sinon.stub(HouseRules.prototype, 'toggleMoreInfo');
    const wrapper = mount(<HouseRules {...completeProps} />);
    wrapper.find('#link').simulate('click');
    expect(toggleStub.callCount).toBe(1);
    toggleStub.restore();
  });
});
