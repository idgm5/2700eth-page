const getPixels = require("get-pixels");

const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(
  new web3.providers.HttpProvider('http://localhost:8545')
);

const abi = require('../src/2700EtherPage.abi.json');
const contractAddr = '0x3b3b48ae25Ac611518bb39bE293bE226Be0D0604';
const mep = new web3.eth.Contract(abi, contractAddr);
const fromAccount = '0xcf6cac0bdb3f079b2a5ea0612a21d7eb2e98a434';

let imagePath = process.argv[2];
let xPos = parseInt(process.argv[3]);
let yPos = parseInt(process.argv[4]);
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
  async function sendPixels(){
    let promises = [];
    let i = 0;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let r = pixels.get(0, x, y, 0);
        let g = pixels.get(0, x, y, 1);
        let b = pixels.get(0, x, y, 2);
        console.log({
            x: x,
            y: y
          },
          ['0x', dec2hex(r), dec2hex(g), dec2hex(b)].join('')
        );
        let resp = mep.methods.colorPixel(xPos + x, yPos + y, ['0x', dec2hex(r), dec2hex(g),
          dec2hex(b)
        ].join('')).send({from: fromAccount, value: 100000000000000000 });
        promises.push(resp);

        if(i > 0 && i & 128 == 0) {
          await Promise.race(promises);
          promises = [];
        }
        i++;
      }
    }
  }
  sendPixels().then(() => console.log('Done'));
})
