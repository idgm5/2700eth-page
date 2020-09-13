// First we'll requite get-pixels
const getPixels = require('get-pixels');

// Next we process the commandline arguments.
// For a real commandline tool I'd use something like yargs, but we'll just use process.argv for now.
// The arguments will be the imagePath, the x position and the y position.
let imagePath = process.argv[2];
let xPos = parseInt(process.argv[3]);
let yPos = parseInt(process.argv[4]);
console.log(imagePath, xPos, yPos);

function dec2hex(dec) {
  return ('00' + parseInt(dec, 10).toString(16)).slice(-2);
}

// we call getPixels with the imagePath and it calls back with the pixels from that image.
getPixels(imagePath, function(err, pixels) {
  // Next we'll extract the images frames, width, height, and channels.
  // I found this by reading the get-pixels documentation.
  // The frames parameter is used when you are loading an animated gif. We're only going to use the first frame.
  let [
    frames,
    width,
    height,
    channels
  ] = pixels.shape.slice();

  // Next we can log out some basic info about this image
  console.log(
    `Shape: ${width}x${height} (${width *
      height} total pixels)`
  );

  // Let's try it out. I've grabed a gif from the internet.
  // node scripts/buy-pixels-001-read.js resources/mario-shell.gif 0 0

  // Now we need to iterate over each pixel
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // We can get the channels from pixels.get and passing the frame (zero) the x and y, and then the index of the channel.
      let r = pixels.get(0, x, y, 0);
      let g = pixels.get(0, x, y, 1);
      let b = pixels.get(0, x, y, 2);

      // This returns us a number from 0 to 255
      // console.log({ x: x, y: y }, [r, g, b]);

      // But remember, we need to save a hexidecimal number when we send our color transaction
      // So we'll have to convert back. Here's the dec2hex() function we talked about earlier.
      console.log(
        { x: x, y: y },
        ['0x', dec2hex(r), dec2hex(g), dec2hex(b)].join('')
      );

      // There we go, now we have the index of each pixel, along with a hex colorcode.
      // Now we can form these pixels into Ethereum transcations.
    }
  }
});
