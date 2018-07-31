import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import SleepingArrangments from './SleepingArrangements';

import { constants } from '../../utils';

const generateSleepingArrangements = (numSleepingArrangements) => {
  const sleepingArrangements = [];
  for (let i = 0; i < numSleepingArrangements; i++) {
    sleepingArrangements.push({
      spaceName: 'placeholder',
      mattressType: 'placeholder',
      number: (i % 2) + 1,
    });
  }
  return sleepingArrangements;
};

const emptyProps = {
  sleepingArrangements: [],
};

const incompleteProps = {
  sleepingArrangements: generateSleepingArrangements(1),
};

const completeProps = {
  sleepingArrangements: generateSleepingArrangements(constants.sleepingArrangementsThreshold + 1),
};

describe('rendering', () => {
  it('should NOT render component when there are no sleeping arrangements', () => {
    const wrapper = mount(<SleepingArrangments {...emptyProps} />);
    const target = wrapper.find('#title');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when there are no sleeping arrangements', () => {
    const error = sinon.spy(console, 'error');
    mount(<SleepingArrangments {...emptyProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
  it('should NOT display action link when there is only one sleeping arrangment', () => {
    const wrapper = mount(<SleepingArrangments {...incompleteProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should display action link when there are many sleeping arrangments', () => {
    const wrapper = mount(<SleepingArrangments {...completeProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
  });
});

describe('interaction', () => {
  it('action link should call "toggleMoreInfo"', () => {
    const toggleStub = sinon.stub(SleepingArrangments.prototype, 'toggleMoreInfo');
    const wrapper = mount(<SleepingArrangments {...completeProps} />);
    wrapper.find('#link').simulate('click');
    expect(toggleStub.callCount).toBe(1);
    toggleStub.restore();
  });
});
