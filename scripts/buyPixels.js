const getPixels = require('get-pixels');
const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(
  new web3.providers.HttpProvider('http://localhost:8545')
);

let imagePath = process.argv[2];
let xPos = parseInt(process.argv[3]);
let yPos = parseInt(process.argv[4]);
console.log(imagePath, xPos, yPos);

const abi = require('../src/2700EtherPage.abi.json');
const mepAddress =
  '0x44d8B643047Be5C0A2AC25309aF3DFdC409b79Ca';
const mep = new web3.eth.Contract(abi, mepAddress);
const fromAccount =
  '0xc87aa412e5eff37f90a8b42f0b21df2da5112d62';

console.log(imagePath, xPos, yPos);

function dec2hex(dec) {
  return ('00' + parseInt(dec, 10).toString(16)).slice(-2);
}

getPixels(imagePath, function(err, pixels) {
  let [
    frames,
    width,
    height,
    channels
  ] = pixels.shape.slice();

  console.log(
    `Shape: ${width}x${height} (${width *
      height} total pixels)`
  );

  async function sendPixels() {
    let promises = [];
    let i = 0;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let r = pixels.get(0, x, y, 0);
        let g = pixels.get(0, x, y, 1);
        let b = pixels.get(0, x, y, 2);

        console.log(
        { x: x, y: y },
        ['0x', dec2hex(r), dec2hex(g), dec2hex(b)].join('')
      );

        let resp = mep.methods
          .colorPixel(
            xPos + x,
            yPos + y,
            ['0x', dec2hex(r), dec2hex(g), dec2hex(b)].join(
              ''
            )
          )
          .send({
            from: fromAccount
          });
        promises.push(resp);

        if (i > 0 && i % 128 == 0) {
          await Promise.race(promises);
          promises = [];
        }

        i++;
      }
    }
  }
  sendPixels().then(() => console.log('Done'));
});
