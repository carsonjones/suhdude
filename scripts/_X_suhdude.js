'use strict';

var React = require('react');

var SuhDude = React.createClass({
  displayName: 'SuhDude',

  propTypes: {
    text: React.PropTypes.string,
    preload: React.PropTypes.string,
    mimeType: React.PropTypes.string,
    containerClass: React.PropTypes.string
  },

  getDefaultProp: function(){
    return{
      text: 'asuhhhdude',
      preload: 'metadata',
      mimeType: 'audio/mpeg'
    }
  },

  getInitialState: function() {
    return {
      playing: false,
      canPlay: false,
      src: './dist/audio/1.mp3'
    }
  },


  getRandomAudio: function(){
    var file = './dist/audio/' + Math.floor((Math.random() * 12) + 1) + '.mp3';
    return this.setState({src: file});
  },

  componentDidMount: function () {
    var playerElement = this.refs.player;
    if (this.props.preload === 'none') {
      this.audioReady();
    } else {
      playerElement.addEventListener('canplay', this.audioReady);
    }
    playerElement.addEventListener('ended', this.audioEnded);
    playerElement.addEventListener('pause', this.audioPause);
  },


  componentWillReceiveProps: function(nextProps) {
    if(this.props.src !== nextProps.src) {
      this.audioPause();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevProps.src !== this.props.src) {
      this.audioLoad();
      this.audioPlay();
    }
  },

  audioReady: function() {
    this.setState({
      canPlay: true
    });
  },

  audioPlay: function() {
    this.refs.player.load();
    this.refs.player.play();
    this.setState({
      playing: true
    });
  },

  audioPause: function() {
    this.refs.player.pause();
    this.setState({
      playing: false
    });
  },

  audioLoad: function() {
    this.refs.player.load();
    this.setState({
      playing: false,
      canPlay: false
    });
  },

  audioEnded: function() {
    this.setState({
      playing: false
    });
  },

  audioSelect: function(){
    return this.props.src;
  },

  togglePlayPause: function () {
    if (this.state.canPlay) {
      if (this.state.playing) {
        this.audioPause();
      } else {
        this.audioPlay();
      }
    }
  },

  // componentDidUpdate(_prevProps, _prevState) {
  //   React.findDOMNode(this.refs.player).load();
  // },

  handleClick: function(event) {
    this.togglePlayPause();
    this.getRandomAudio();
  },

  render: function(){
    var src = this.state.src;
    return (
      <div className={this.props.containerClass}>
        <audio ref='player' preload= {this.props.preload} >
          <source src={src} type={this.props.mimeType}></source>
        </audio>
        <button onClick={this.handleClick} className='play'>
          suh
        </button>
      </div>
    );
  }
});

module.exports = SuhDude;
