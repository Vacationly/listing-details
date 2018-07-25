import React from 'react';
import PropTypes from 'prop-types';

import Section from '../Utilities/Section/Section';
import styles from './VideoPlayer.css';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.requestFullscreen = this.requestFullscreen.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.resumeVideo = this.resumeVideo.bind(this);
    this.state = {
      playing: false,
      muted: false,
      // fullscreen: false,
      progress: 0,
    };
  }

  componentDidMount() {
    [this.video] = document.getElementsByTagName('video');
  }

  togglePlay() {
    this.setState(
      prevState => ({
        playing: !prevState.playing,
      }),
      () => {
        this.state.playing ? this.video.play() : this.video.pause();
      },
    );
  }

  toggleMute() {
    this.setState(
      prevState => ({
        muted: !prevState.muted,
      }),
      () => {
        this.video.muted = this.state.muted;
      },
    );
  }

  // requestFullscreen() {
  //   this.setState(
  //     prevState => ({
  //       fullscreen: !prevState.fullsreen,
  //     }),
  //     () => {
  //       this.state.fullscreen ? this.requestFullscreen() : this.exitFullscreen();
  //     },
  //   );
  // }

  pauseVideo() {
    this.video.pause();
  }

  resumeVideo() {
    this.state.playing ? this.video.play() : this.video.pause();
  }

  requestFullscreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  // exitFullscreen() {
  //   if (this.video.exitFullscreen) {
  //     this.video.exitFullscreen();
  //   } else if (this.video.mozExitFullScreen) {
  //     this.video.mozExitFullScreen();
  //   } else if (this.video.webkitExitFullscreen) {
  //     this.video.webkitExitFullscreen();
  //   }
  // }

  handleProgress(event) {
    const newTime = (event.target.value / 100) * this.video.duration;
    this.video.currentTime = newTime;
  }

  updateProgress(callback) {
    const progress = (this.video.duration / 100) * this.video.currentTime;
    callback(progress);
  }

  handleVolume(event) {
    this.video.volume = event.target.value / 100;
    this.setState(
      {
        muted: false,
      },
      () => {
        this.video.muted = false;
      },
    );
  }

  render() {
    const video = (
      <Video
        {...this.props}
        {...this.state}
        togglePlay={this.togglePlay}
        toggleMute={this.toggleMute}
        requestFullscreen={this.requestFullscreen}
        handleProgress={this.handleProgress}
        handleVolume={this.handleVolume}
      />
    );
    return (
      <div>
        <Section title="Take a tour" content={video} />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  // title: PropTypes.string.isRequired,
  videoSource: PropTypes.string.isRequired,
};

const Video = (props) => {
  const { videoSource } = props;
  return (
    <div className={styles.videoContainer}>
      <video className={styles.video} src={videoSource} controls>
        Please upgrade your browser.
      </video>
      <div className={styles.videoOverlay}>
        <Controls {...props}>
text
        </Controls>
      </div>
    </div>
  );
};

Video.propTypes = {
  videoSource: PropTypes.string.isRequired,
};

// this.togglePlay = this.togglePlay.bind(this);
// this.toggleMute = this.toggleMute.bind(this);
// this.requestFullscreen = this.requestFullscreen.bind(this);
// this.handleProgress = this.handleProgress.bind(this);
// this.updateProgress = this.updateProgress.bind(this);
// this.handleVolume = this.handleVolume.bind(this);
// this.pauseVideo = this.pauseVideo.bind(this);
// this.resumeVideo = this.resumeVideo.bind(this);

const Controls = (props) => {
  const {
    togglePlay,
    toggleMute,
    progress,
    handleProgress,
    handleVolume,
    requestFullscreen,
  } = props;
  return (
    <div>
      <button onClick={togglePlay}>
play
      </button>
      <button onClick={toggleMute}>
mute
      </button>
      <button onClick={requestFullscreen}>
full
      </button>
      <input type="range" onChange={handleProgress} />
      <input type="range" onChange={handleVolume} />
    </div>
  );
};
