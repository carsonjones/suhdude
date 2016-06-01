/*
  APP
*/

import React from 'react';
import Dude from './dude';
import Suh from './suh';


// import Rebase  from 're-base';
// var base = Rebase.createClass('https://project-4518474644381598383.firebaseio.com/');

import dudes from '../data/dudes';
import suhs from '../data/audio';

var SuhDude = React.createClass({
  getInitialState: function() {
    var image = this.getRandomImage(dudes),
        audio = this.getRandomAudio(suhs);
    return {
      image: image,
      audio: audio
    };
  },

  getRandomImage: function(images){
    var index = Math.floor((Math.random() * (images.length-1)) + 1);
    return images[index];
  },
  getRandomAudio: function(audio){
    var index = Math.floor((Math.random() * (audio.length-1)) + 1);
    return audio[index];
  },

  handleClick: function(){
    var audio = document.querySelector(".uhhh");
    audio.load();
    audio.play();
    this.setState({
      image: this.getRandomImage(dudes),
      audio: this.getRandomAudio(suhs)
    });
  },

  render: function(){
    return(
      <div className="dude">
        <Dude image={this.state.image} />
        <Suh audio={this.state.audio} />
        <button className="dude__play btn" onClick={this.handleClick}>
          suhhhhh
        </button>
      </div>
    )
  }
});

export default SuhDude;