var Web3 = require('web3');

var web3 = new Web3();

web3.setProvider(
  new Web3.providers.WebsocketProvider(
    'ws://localhost:8080'
  )
);

const abi = require('./2700EtherPage.abi.json');
const contractAddr = '0x5aE3a2EC65E8d40748cF92052CACfc99B433Bb74';

let mep = new web3.eth.Contract(abi, contractAddr);

mep.events.PixelChanged(
  {
    fromBlock: 0
  },
  function(error, event) {
    console.log('new event : ', event);
  }
);

mep.getPastEvents(
  'PixelChanged',
  {
    fromBlock: 0
  },
  function(error, events) {
    console.log('event : ', events);
  }
);

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

    for (var i = 0; i < data.length; i += 4) {
      let rnd = () => parseInt(Math.random() * 1000 % 255);
      data[i] = rnd(); // red
      data[i + 1] = rnd(); // green
      data[i + 2] = rnd(); // blue
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }
}

document.body.onload = function() {
  draw();
};
