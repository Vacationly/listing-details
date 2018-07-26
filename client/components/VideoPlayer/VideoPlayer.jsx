import React from 'react';
import PropTypes from 'prop-types';

import Section from '../Utilities/Section/Section';
import styles from './VideoPlayer.css';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.pauseForNow = this.pauseForNow.bind(this);
    this.restoreStatus = this.restoreStatus.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.requestFullscreen = this.requestFullscreen.bind(this);
    this.state = {
      playing: false,
      muted: false,
      progress: 0,
    };
  }

  componentDidMount() {
    [this.video] = document.getElementsByTagName('video');
    this.video.addEventListener('timeupdate', () => {
      const progress = (this.video.currentTime / this.video.duration) * 100;
      this.setState({ progress });
    });
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

  handleProgress(event) {
    const newTime = (event.target.value / 100) * this.video.duration;
    this.video.currentTime = newTime;
  }

  pauseForNow() {
    console.log('pausing...');
    this.video.pause();
  }

  restoreStatus() {
    this.state.playing ? this.video.play() : this.video.pause();
  }

  toggleMute() {
    this.setState(
      prevState => ({
        muted: !prevState.muted,
      }),
      () => {
        const { muted } = this.state;
        this.video.muted = muted;
      },
    );
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

  requestFullscreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  render() {
    const video = (
      <Video
        {...this.props}
        {...this.state}
        togglePlay={this.togglePlay}
        handleProgress={this.handleProgress}
        pauseForNow={this.pauseForNow}
        restoreStatus={this.restoreStatus}
        toggleMute={this.toggleMute}
        handleVolume={this.handleVolume}
        requestFullscreen={this.requestFullscreen}
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

const Controls = (props) => {
  const {
    togglePlay,
    progress,
    handleProgress,
    pauseForNow,
    restoreStatus,
    toggleMute,
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
      <input
        type="range"
        value={progress}
        onChange={handleProgress}
        onMouseDown={pauseForNow}
        onMouseUp={restoreStatus}
      />
      <input type="range" onChange={handleVolume} />
    </div>
  );
};
