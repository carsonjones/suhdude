var play = require('play'),
    fs = require('fs'),
    Promise = require('bluebird');

// var readFile = Promise.promisify(require("fs").readFile);

var readdir = Promise.promisify(fs.readdir);

// var bit = Math.floor(Math.random() * (max - min + 1)) + min;

readdir('./audio').then(function(files){
  return eval(files);
}).then(function(files){
  // console.log(files);
  var random = Math.floor(Math.random() * (files.length - 1 + 1)) + 1;
  play.sound('./audio/' + files[random] );
});

// fs.readdir('./audio', function(err, files){
//   if(err){
//     'Something went wrong: '+ err;
//   }
//   return files;
// });

// var getAudio = function(){
//   return fs.readdir('./audio', function(err, files){
//     if(err){
//       'Something went wrong: '+ err;
//     }
//     return files;
//   });
// };

// getAudio();

// play.sound('./audio/2.mp3');
