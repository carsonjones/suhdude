var React = require('react');
var ReactDOM = require('react-dom');
var SuhDude = require('./suhdude');

ReactDOM.render(
  <SuhDude  preload='none'
            text='suhhhhhhdude'
            containerClass='asuh'
            mimeType= 'audio/mpeg'/>,
  document.getElementById('cool')
);
