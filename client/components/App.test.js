import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from './App.jsx';

describe('It should add numbers properly', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('componentWillReceiveProps()', () => {
  it('call logUserId once', () => {
    const getDataForListing = sinon.stub(App.prototype, 'getDataForListing');
    shallow(<App />);
    expect(getDataForListing).toBe.calledOnce;
  });
});
