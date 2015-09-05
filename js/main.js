(function () {
	"use strict";

    var sound = new Howl({
      urls: ['public/kit.ogg'],
      sprite: {
        kick: [0, 420], snare: [453, 434], clap: [11383, 157], cowbell: [908, 115],
        hiTom: [1360, 602], midTom: [1997, 851], lowTom: [2894, 839],
        hatOpen: [3756, 955], hatClosed: [4734, 130],
        ride: [4911, 962], tamb: [5878, 277], crash: [6830, 1267], splash: [8127, 843],
        china: [9578, 855], hiAgogo: [10591, 433], lowAgogo: [11095, 273],
        rest: [0,0]
      }
    });

    var note = {
      '-': 'rest', s: 'snare',
      k: 'kick', b: 'kick',
      x: 'hatClosed', o: 'hatClosed',
      h: 'hatOpen', i: 'china',
      c: 'crash', r: 'ride', p: 'splash',
      t: 'hiTom', m: 'midTom', f: 'lowTom',
      l: 'clap', z: 'tamb', w: 'cowbell',
      a: 'hiAgogo', g: 'lowAgogo'
    }

    function getPattern() {
      return document.getElementById("pattern").value;
    }

    function getTempo() {
      return document.getElementById("tempo").value;
    }

    function playPattern(index) {
      setTimeout(function() {
        pattern = getPattern();
        sound.volume = pattern.charAt(index)==pattern.charAt(index).toUpperCase() ? 1.0 : 0.6;
        sound.play(note[pattern.charAt(index).toLowerCase()]);
        do {
	        index++;
	        if (index >= pattern.length)
	          index = 0;
	        if (pattern.charAt(index)=='+') {
	            sound.play(note[pattern.charAt(index+1).toLowerCase()]);
	            index = index + 2;
	        }
        } while(!note.hasOwnProperty(pattern.charAt(index).toLowerCase()))
        playPattern(index);
      }, 60000/4/getTempo());
    }
    
    playPattern(0);
})();
