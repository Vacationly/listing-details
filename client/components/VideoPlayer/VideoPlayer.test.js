import React from 'react';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import VideoPlayer from './VideoPlayer';

const validProps = {
  videoSource: 'Testing',
};

const invalidProps = {
  videoSource: 1,
};

const dummyVideo = {
  addEventListener() {},
  removeEventListener() {},
  play() {},
  pause() {},
  requestFullscreen() {},
  currentTime: 0,
  duration: 1,
  muted: false,
  volume: 1,
};

describe('interaction', () => {
  let mountStub;
  let wrapper;
  beforeEach(() => {
    VideoPlayer.prototype.video = dummyVideo;
    mountStub = sinon.stub(VideoPlayer.prototype, 'componentDidMount');
    wrapper = mount(<VideoPlayer {...validProps} />);
  });
  afterEach(() => {
    mountStub.restore();
  });
  it('should display bigPlay button by default', () => {
    const bigPlayButton = wrapper.find('#bigPlay').hostNodes();
    expect(bigPlayButton.length).toBe(1);
  });
  it('should play video and hide bigPlay button when bigPlay is clicked', () => {
    const bigPlayButton = wrapper.find('#bigPlay').hostNodes();
    bigPlayButton.simulate('click');
    const bigPlayPhantom = wrapper.find('#bigPlay').hostNodes();
    expect(bigPlayPhantom.length).toBe(0);
    expect(wrapper.instance().state.playing).toBe(true);
  });
  it('should display play button by default', () => {
    const playButton = wrapper.find('#play').hostNodes();
    const pausePhantom = wrapper.find('#pause').hostNodes();
    expect(playButton.length).toBe(1);
    expect(pausePhantom.length).toBe(0);
  });
  it('should play video and change button icon when play is clicked', () => {
    const playButton = wrapper.find('#play').hostNodes();
    playButton.simulate('click');
    const playPhantom = wrapper.find('#play').hostNodes();
    const pauseButton = wrapper.find('#pause').hostNodes();
    expect(playPhantom.length).toBe(0);
    expect(pauseButton.length).toBe(1);
    expect(wrapper.instance().state.playing).toBe(true);
  });
  it('should pause video and change button icon when pause is clicked', () => {
    const playButton = wrapper.find('#play').hostNodes();
    playButton.simulate('click');
    const pauseButton = wrapper.find('#pause').hostNodes();
    pauseButton.simulate('click');
    const newPlayButton = wrapper.find('#play').hostNodes();
    expect(newPlayButton.length).toBe(1);
    expect(wrapper.instance().state.playing).toBe(false);
  });
  it('should display mute button by default', () => {
    const muteButton = wrapper.find('#mute').hostNodes();
    const unmutePhantom = wrapper.find('#unmute').hostNodes();
    expect(muteButton.length).toBe(1);
    expect(unmutePhantom.length).toBe(0);
  });
  it('should mute video and change icon when mute is clicked', () => {
    const muteButton = wrapper.find('#mute').hostNodes();
    muteButton.simulate('click');
    const mutePhantom = wrapper.find('#mute').hostNodes();
    const unmuteButton = wrapper.find('#unmute').hostNodes();
    expect(mutePhantom.length).toBe(0);
    expect(unmuteButton.length).toBe(1);
    expect(wrapper.instance().state.muted).toBe(true);
  });
  it('should unmute video and change icon when unmute is clicked', () => {
    const muteButton = wrapper.find('#mute').hostNodes();
    muteButton.simulate('click');
    const unmuteButton = wrapper.find('#unmute').hostNodes();
    unmuteButton.simulate('click');
    const newMuteButton = wrapper.find('#mute').hostNodes();
    expect(newMuteButton.length).toBe(1);
    expect(wrapper.instance().state.muted).toBe(false);
  });
  it('should change video progress when progress bar is changed', () => {
    const dragEvent = { target: { value: 50 } };
    wrapper.find('#progress').simulate('change', dragEvent);
    expect(wrapper.instance().state.progress).toBe(50);
  });
  it('should change video volume when volume bar is changed', () => {
    const dragEvent = { target: { value: 50 } };
    wrapper.find('#volume').simulate('change', dragEvent);
    expect(wrapper.instance().video.current.volume).toBe(0.5);
  });
});

describe('validation', () => {
  let error;
  let mountStub;
  beforeEach(() => {
    mountStub = sinon.stub(VideoPlayer.prototype, 'componentDidMount');
    error = sinon.stub(console, 'error');
  });
  afterEach(() => {
    mountStub.restore();
    error.restore();
  });
  it('should throw an error when given a prop of invalid type', () => {
    shallow(<VideoPlayer {...invalidProps} />);
    expect(error.callCount).toBe(1);
  });
});
