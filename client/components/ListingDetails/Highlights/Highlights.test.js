import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';
import Highlights from './Highlights';

const emptyProps = {
  highlights: [],
};

const completeProps = {
  id: 1,
  highlights: [{ tagline: 'placeholder', description: 'placeholder', upvotes: 0 }],
  saveFeedback() {
    return true;
  },
};

describe('rendering', () => {
  it('should NOT render component when there are no highlights', () => {
    const wrapper = mount(<Highlights {...emptyProps} />);
    const target = wrapper.find('#title');
    expect(target.length).toBe(0);
  });
  it('should NOT throw an error when there are no highlights', () => {
    const error = sinon.spy(console, 'error');
    mount(<Highlights {...emptyProps} />);
    expect(error.callCount).toBe(0);
    error.restore();
  });
});

describe('interaction', () => {
  it('clicking on "upvote" or "downvote" should call "handleFeedback"', () => {
    const feedbackStub = sinon.stub(Highlights.prototype, 'handleFeedback');
    const wrapper = mount(<Highlights {...completeProps} />);
    wrapper.find('#upvote').simulate('click');
    expect(feedbackStub.callCount).toBe(1);
    feedbackStub.restore();
  });
  it('clicking on "upvote" or "downvote" should update feedbackStatus', () => {
    const wrapper = mount(<Highlights {...completeProps} />);
    wrapper.find('#downvote').simulate('click');
    wrapper.update();
    const { feedbackStatus } = wrapper.state();
    expect(feedbackStatus).not.toEqual([]);
  });
});
