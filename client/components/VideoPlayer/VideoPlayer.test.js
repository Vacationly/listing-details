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
  duration: 10,
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
    const target = wrapper.find('#bigPlay').hostNodes();
    expect(target.length).toBe(1);
  });
  it('should play video and hide bigPlay button when bigPlay is clicked', () => {
    const target = wrapper.find('#bigPlay').hostNodes();
    target.simulate('click');
    wrapper.update();
    const newTarget = wrapper.find('#bigPlay');
    expect(newTarget.length).toBe(0);
    expect(wrapper.instance().state.playing).toBe(true);
  });
  // it('should display play button by default', () => {
  //   const wrapper = mount(<Video {...validProps} />);
  //   const target = wrapper.find('#dismiss');
  //   target.className = 'dismiss';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(1);
  // });
  // it('should play video and change button icon when play is clicked', () => {
  //   const wrapper = shallow(<Modal {...validProps} />);
  //   const target = wrapper.find('#dismiss');
  //   target.className = 'dismiss';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(1);
  // });
  // it('should pause video and change button icon when pause is clicked', () => {
  //   const wrapper = shallow(<Modal {...validProps} />);
  //   const target = wrapper.find('#backdrop');
  //   target.className = 'backdrop';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(1);
  // });
  // it('should not be muted by default', () => {
  //   const wrapper = shallow(<Modal {...validProps} />);
  //   const target = wrapper.find('#frame');
  //   target.className = 'frame';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(0);
  // });
  // it('should mute video and change icon when mute is clicked', () => {
  //   const wrapper = shallow(<Modal {...validProps} />);
  //   const target = wrapper.find('#frame');
  //   target.className = 'frame';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(0);
  // });
  // it('should unmute video and change icon when unmute is clicked', () => {
  //   const wrapper = shallow(<Modal {...validProps} />);
  //   const target = wrapper.find('#frame');
  //   target.className = 'frame';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(0);
  // });
  // it('should change video progress when progress bar is dragged', () => {
  //   const wrapper = shallow(<Modal {...validProps} />);
  //   const target = wrapper.find('#frame');
  //   target.className = 'frame';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(0);
  // });
  // it('should change video volume when volume bar is dragged', () => {
  //   const wrapper = shallow(<Modal {...validProps} />);
  //   const target = wrapper.find('#frame');
  //   target.className = 'frame';
  //   clickEvent.target = target;
  //   target.simulate('click', clickEvent);
  //   expect(dismiss.callCount).toBe(0);
  // });
});

describe('validation', () => {
  let error;
  let mount;
  beforeEach(() => {
    mount = sinon.stub(VideoPlayer.prototype, 'componentDidMount');
    error = sinon.spy(console, 'error');
  });
  afterEach(() => {
    mount.restore();
    error.restore();
  });
  it('should throw an error when given a prop of invalid type', () => {
    shallow(<VideoPlayer {...invalidProps} />);
    expect(error.callCount).toBe(1);
  });
});
