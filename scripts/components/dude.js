/*
  DUDE - who said that?
  <Dude>
*/

import React from 'react';

var Dude = React.createClass({
  render: function() {
    var image = this.props.image;
    return(
      <div className="dude__img">
        <img src={image.src} alt={image.txt} />
      </div>
    )
  }
});

export default Dude;