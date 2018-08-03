import React from 'react';
import PropTypes from 'prop-types';
import {
  GoPlaybackPlay,
  GoPlaybackPause,
  GoMute,
  GoUnmute,
  GoScreenFull,
} from 'react-icons/lib/go';
import FaPlayCircle from 'react-icons/lib/fa/play-circle';

import Section from '../Utilities/Section/Section';
import styles from './VideoPlayer.css';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      muted: false,
      progress: 0,
    };
    this.updateProgress = this.updateProgress.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.pauseForNow = this.pauseForNow.bind(this);
    this.restoreStatus = this.restoreStatus.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.requestFullscreen = this.requestFullscreen.bind(this);
  }

  componentDidMount() {
    [this.video] = window.document.getElementsByTagName('video');
    this.video.addEventListener('timeupdate', this.updateProgress);
    this.video.volume = 1;
  }

  updateProgress() {
    const progress = (this.video.currentTime / this.video.duration) * 100;
    this.setState({ progress }, () => {
      if (progress === 100) {
        this.setState({ playing: false });
      }
    });
  }

  togglePlay() {
    this.setState(
      prevState => ({
        playing: !prevState.playing,
      }),
      () => {
        this.restoreStatus();
      },
    );
  }

  handleProgress(event) {
    this.video.currentTime = (event.target.value / 100) * this.video.duration;
    this.setState({ progress: event.target.value });
  }

  pauseForNow() {
    this.video.removeEventListener('timeupdate', this.updateProgress);
    this.video.pause();
  }

  restoreStatus() {
    const { playing } = this.state;
    if (playing) {
      this.video.play();
    } else {
      this.video.pause();
    }
    this.video.addEventListener('timeupdate', this.updateProgress);
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
  }

  requestFullscreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    }
  }

  render() {
    const { videoSource } = this.props;
    const { playing, progress, muted } = this.state;
    return (
      <div>
        <Section title="Take the tour">
          <div className={styles.videoContainer}>
            <video className={styles.video} src={videoSource}>
              Please upgrade your browser.
            </video>
            <div
              className={`${styles.videoOverlay} ${playing ? styles.playing : ''}`}
              onDoubleClick={Document.exitFullscreen}
            >
              <div className={styles.screen} onClick={this.togglePlay} role="button" tabIndex="0">
                {!playing && <FaPlayCircle id="bigPlay" className={styles.bigPlay} />}
              </div>
              <Controls
                playing={playing}
                progress={progress}
                togglePlay={this.togglePlay}
                handleProgress={this.handleProgress}
                pauseForNow={this.pauseForNow}
                restoreStatus={this.restoreStatus}
                muted={muted}
                toggleMute={this.toggleMute}
                handleVolume={this.handleVolume}
                requestFullscreen={this.requestFullscreen}
              />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  videoSource: PropTypes.string.isRequired,
};

const Controls = (props) => {
  const {
    playing,
    progress,
    togglePlay,
    handleProgress,
    pauseForNow,
    restoreStatus,
    muted,
    toggleMute,
    handleVolume,
    requestFullscreen,
  } = props;
  return (
    <div className={styles.controls}>
      <div className={styles.button} onClick={togglePlay} role="button" tabIndex="0">
        {playing ? <GoPlaybackPause /> : <GoPlaybackPlay />}
      </div>
      <input
        type="range"
        className={`${styles.slider} ${styles.progress}`}
        value={progress}
        onChange={handleProgress}
        onMouseDown={pauseForNow}
        onMouseUp={restoreStatus}
      />
      <div className={styles.button} onClick={toggleMute} role="button" tabIndex="0">
        {muted ? <GoUnmute /> : <GoMute />}
      </div>
      <input
        type="range"
        className={`${styles.slider} ${styles.volume} ${muted ? styles.hidden : ''}`}
        defaultValue="100"
        onChange={handleVolume}
      />
      <div className={styles.button} onClick={requestFullscreen} role="button" tabIndex="0">
        <GoScreenFull />
      </div>
    </div>
  );
};

Controls.propTypes = {
  playing: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  handleProgress: PropTypes.func.isRequired,
  pauseForNow: PropTypes.func.isRequired,
  restoreStatus: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  toggleMute: PropTypes.func.isRequired,
  handleVolume: PropTypes.func.isRequired,
  requestFullscreen: PropTypes.func.isRequired,
};
