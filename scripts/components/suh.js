/*
  SUH - the audio
  <Suh>
*/

import React from 'react';

var Suh = React.createClass({
  render: function(){
    var audio = this.props.audio;
    return(
      <div className="dude__suh">
        <audio className="uhhh" ref="player" preload={audio.preload}>
          <source src={audio.src} type={audio.mimeType} />
        </audio>
      </div>
    )
  }
});

export default Suh;