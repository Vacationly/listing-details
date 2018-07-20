import React from 'react';
import axios from 'axios';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ListingSummary from './ListingSummary';

// const mockResponse = { data: { title: 'Sample Listing' } };
// const getRequest = Promise.resolve(mockResponse);
// let getListingData;
// let axiosGet;

// beforeAll(() => {
//   getListingData = sinon.spy(App.prototype, 'getListingData');
//   axiosGet = sinon.stub(axios, 'get').callsFake(() => getRequest);
// });

// afterAll(() => {
//   getListingData.restore();
//   axiosGet.restore();
// });

// describe('componentDidMount()', () => {
//   it('should call getDataForListing once when mounting', () => {
//     const wrapper = shallow(<App />);
//     return Promise.resolve(wrapper).then(() => {
//       expect(getListingData.callCount).toBe(1);
//     });
//   });
//   it('should receive listingData upon mounting', () => {
//     const wrapper = shallow(<App />);
//     return Promise.resolve(wrapper).then(() => {
//       expect(wrapper.state()).toHaveProperty('listingData', mockResponse.data);
//     });
//   });
// });

// describe('setListing()', () => {
//   let wrapper;
//   const spy = sinon.spy(App.prototype, 'setState');

//   beforeEach(() => {
//     wrapper = mount(<App />);
//   });

//   it('should call setState once if listingId is valid', () => {
//     spy.resetHistory();
//     wrapper.instance().setListing(5);
//     expect(spy.callCount).toBe(1);
//   });
//   it('should not call setState if listingId is invalid', () => {
//     spy.resetHistory();
//     wrapper.instance().setListing(-1);
//     expect(spy.callCount).toBe(0);
//   });
// });

// describe('render()', () => {
//   it('should change what is displayed once component is mounted', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.find('div')).toHaveLength(1);
//     return Promise.resolve(wrapper).then(() => {
//       wrapper.update();
//       expect(wrapper.find('div')).not.toHaveLength(1);
//     });
//   });
// });
