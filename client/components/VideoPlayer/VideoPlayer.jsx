import React from 'react';
import PropTypes from 'prop-types';

import Section from '../Utilities/Section/Section';
import styles from './VideoPlayer.css';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.pauseForNow = this.pauseForNow.bind(this);
    this.restoreStatus = this.restoreStatus.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
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

  handlePlay(event) {
    event.stopPropagation();
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
    event.stopPropagation();
    const newTime = (event.target.value / 100) * this.video.duration;
    this.video.currentTime = newTime;
  }

  pauseForNow() {
    this.video.pause();
  }

  restoreStatus() {
    this.state.playing ? this.video.play() : this.video.pause();
  }

  handleMute(event) {
    event.stopPropagation();
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
    event.stopPropagation();
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

  handleFullscreen(event) {
    event.stopPropagation();
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
        handlePlay={this.handlePlay}
        handleProgress={this.handleProgress}
        pauseForNow={this.pauseForNow}
        restoreStatus={this.restoreStatus}
        handleMute={this.handleMute}
        handleVolume={this.handleVolume}
        handleFullscreen={this.handleFullscreen}
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
  const { videoSource, handlePlay } = props;
  return (
    <div className={styles.videoContainer}>
      <video className={styles.video} src={videoSource}>
        Please upgrade your browser.
      </video>
      <div className={styles.videoOverlay}>
        <div className={styles.screen} onClick={handlePlay} />
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
    playing,
    handlePlay,
    progress,
    handleProgress,
    pauseForNow,
    restoreStatus,
    muted,
    handleMute,
    handleVolume,
    handleFullscreen,
  } = props;
  return (
    <div className={styles.controls}>
      <button onClick={handlePlay}>
        {playing ? 'pause' : 'play'}
      </button>
      <button onClick={handleMute}>
        {muted ? 'unmute' : 'mute'}
      </button>
      <input type="range" onChange={handleVolume} />
      <input
        type="range"
        className={styles.progress}
        value={progress}
        onChange={handleProgress}
        onMouseDown={pauseForNow}
        onMouseUp={restoreStatus}
      />
      <button onClick={handleFullscreen}>
fullscreen
      </button>
    </div>
  );
};
