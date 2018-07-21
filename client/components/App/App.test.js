import React from 'react';
import axios from 'axios';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from './App';

const mockResponse = { data: { title: 'Sample Listing' } };
const getRequest = Promise.resolve(mockResponse);
let getListingData;
let axiosGet;

beforeAll(() => {
  getListingData = sinon.spy(App.prototype, 'getListingData');
  axiosGet = sinon.stub(axios, 'get').callsFake(() => getRequest);
});

afterAll(() => {
  getListingData.restore();
  axiosGet.restore();
});

describe('componentDidMount()', () => {
  it('should call getDataForListing once when mounting', () => {
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      expect(getListingData.callCount).toBe(1);
    });
  });
  it('should receive listingData upon mounting', () => {
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      expect(wrapper.state()).toHaveProperty('listingData', mockResponse.data);
    });
  });
});

describe('render()', () => {
  it('should change what is displayed once component is mounted', () => {
    const wrapper = shallow(<App />);
    const initialDiv = expect(wrapper.find('div'));
    return Promise.resolve(wrapper).then(() => {
      wrapper.update();
      expect(wrapper.find('div')).not.toEqual(initialDiv);
    });
  });
});
