var Web3 = require('web3');

var web3 = new Web3();

web3.setProvider(
  new Web3.providers.WebsocketProvider(
    'ws://localhost:8080'
  )
);

const abi = require('./2700EtherPage.abi.json');
const contractAddr = '0x44d8B643047Be5C0A2AC25309aF3DFdC409b79Ca';

let mep = new web3.eth.Contract(abi, contractAddr);

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    let data = imageData.data;

    function writePixelWithEvent(event) {
      let { x, y, color } = event.returnValues;
      writePixel(
        parseInt(x),
        parseInt(y),
        parseColor(color)
      );
    }

    function parseColor(rawColor) {
      let rgb = [];
      for (let i = 0; i < rawColor.length; i += 2) {
        let chunk = rawColor.substring(i, i + 2);
        if (chunk !== '0x') {
          rgb.push(parseInt(chunk, 16).toString(10));
        }
      }
      return rgb;
    }

    function writePixel(x, y, color) {
      console.log(x, y, color);
      let data = imageData.data;
      let columns = canvas.width;
      let rows = canvas.height;

      let i = (y * columns + x) * 4;

      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255; // alpha
      ctx.putImageData(imageData, 0, 0);
    }

    mep.events.PixelChanged(
      {
        fromBlock: 0
      },
      function(error, event) {
        console.log('new event : ', event);
        writePixelWithEvent(event);
      }
    );

    mep.getPastEvents(
      'PixelChanged',
      {
        fromBlock: 0
      },
      function(error, events) {
        console.log('event : ', events);
        events.map(e => writePixelWithEvent(e));
      }
    );
  }
}

document.body.onload = function() {
  draw();
};
