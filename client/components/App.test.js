import React from 'react';
import axios from 'axios';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from './App';
import { constants } from '../utils';

const mockResponse = { data: constants.dummyListing };
const { dummyListing } = constants;

describe('componentDidMount() with successful API request', () => {
  const getRequest = Promise.resolve(mockResponse);
  let axiosGet;
  beforeEach(() => {
    axiosGet = sinon.stub(axios, 'get').callsFake(() => getRequest);
  });
  afterEach(() => {
    axiosGet.restore();
  });
  it('should call getDataForListing once when mounting', (done) => {
    const getListingData = sinon.spy(App.prototype, 'getListingData');
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      expect(getListingData.callCount).toBe(1);
      getListingData.restore();
      done();
    });
  });
  it('should receive listingData upon mounting', (done) => {
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      expect(wrapper.state()).toHaveProperty('listingData', mockResponse.data);
      done();
    });
  });
  it('should change what is displayed once component is mounted', (done) => {
    const wrapper = shallow(<App />);
    const initialDiv = expect(wrapper.find('div'));
    return Promise.resolve(wrapper).then(() => {
      wrapper.update();
      expect(wrapper.find('div')).not.toEqual(initialDiv);
      done();
    });
  });
});

describe('componentDidMount() with unsuccessful API request', () => {
  const getRequest = Promise.reject(new Error());
  let axiosGet;
  beforeEach(() => {
    axiosGet = sinon.stub(axios, 'get').callsFake(() => getRequest);
  });
  afterEach(() => {
    axiosGet.restore();
  });
  it('should set state using "dummyListing" when server returns error', (done) => {
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      expect(wrapper.state()).toHaveProperty('listingData', dummyListing);
      done();
    });
  });
  it('should change what is displayed once component is mounted', (done) => {
    const wrapper = shallow(<App />);
    const initialDiv = expect(wrapper.find('div'));
    return Promise.resolve(wrapper).then(() => {
      wrapper.update();
      expect(wrapper.find('div')).not.toEqual(initialDiv);
      done();
    });
  });
});

describe('saveFeedbackData()', () => {
  let axiosPut;
  beforeEach(() => {
    axiosPut = sinon.spy(axios, 'put');
  });
  afterEach(() => {
    axiosPut.restore();
  });
  it('should call axios.put to update feedback data', (done) => {
    const wrapper = shallow(<App />);
    return Promise.resolve(wrapper).then(() => {
      wrapper.instance().saveFeedbackData();
      expect(axiosPut.callCount).toBe(1);
      done();
    });
  });
});
