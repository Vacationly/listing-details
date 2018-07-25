import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import Amenities from './Amenities';

import { constants } from '../../utils';

const generateAmenities = (numAmenities) => {
  const amenities = [];
  for (let i = 0; i < numAmenities; i++) {
    amenities.push({
      name: 'placeholder',
      icon: 'placeholder',
    });
  }
  return amenities;
};

const emptyProps = {
  amenities: [],
};

const incompleteProps = {
  amenities: generateAmenities(1),
};

const completeProps = {
  amenities: generateAmenities(constants.amenitiesThreshold + 1),
};

describe('rendering', () => {
  it('should NOT render component when there are no amenities', () => {
    const wrapper = mount(<Amenities {...emptyProps} />);
    const target = wrapper.find('#title');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when there are no amenities', () => {
    const error = sinon.spy(console, 'error');
    mount(<Amenities {...emptyProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
  it('should NOT display action link when there is only one amenity', () => {
    const wrapper = mount(<Amenities {...incompleteProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(0);
  });
  it('should display action link when there are many amenities', () => {
    const wrapper = mount(<Amenities {...completeProps} />);
    const target = wrapper.find('#link');
    expect(target.length).toBe(1);
  });
});

describe('interaction', () => {
  it('action link should call "toggleModal"', () => {
    const toggleStub = sinon.stub(Amenities.prototype, 'toggleModal');
    const wrapper = mount(<Amenities {...completeProps} />);
    wrapper.find('#link').simulate('click');
    expect(toggleStub.callCount).toBe(1);
    toggleStub.restore();
  });
});
