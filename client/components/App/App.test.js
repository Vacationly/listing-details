import React from 'react';
import axios from 'axios';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import App from './App';

const mockResponse = { data: { title: 'Sample Listing' } };
const getListingData = sinon.spy(App.prototype, 'getListingData');

describe('componentDidMount()', () => {
  it('should call getDataForListing once when mounting', () => {
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      expect(getListingData.callCount).toBe(1);
    });
  });
  it('should receive listingData upon mounting', () => {
    const getRequest = Promise.resolve(mockResponse);
    const axiosGet = sinon.stub(axios, 'get').callsFake(() => getRequest);
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      expect(wrapper.state()).toHaveProperty('listingData', mockResponse.data);
      axiosGet.restore();
    });
  });
});

describe('setListing()', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should call getDataForListing once if listingId is valid', () => {
    getListingData.resetHistory();
    wrapper.instance().setListing(5);
    expect(getListingData.callCount).toBe(1);
  });
  it('should not call getDataForListing once if listingId is invalid', () => {
    getListingData.resetHistory();
    wrapper.instance().setListing(-1);
    expect(getListingData.callCount).toBe(0);
  });
});
