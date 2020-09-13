pragma solidity ^0.7.1;

contract TwentySevenHundredEtherPage {
  struct Pixel {
      address owner;
      uint soldPrice;
      bytes3 color;
  }
  
  Pixel[100][1000] public pixels;
  
  event PixelChanged(
      uint x,
      uint y,
      address owner,
      uint soldPrice,
      bytes3 color
   );
    
  function colorPixel(uint x, uint y, bytes3 color) payable public {
    Pixel storage pixel = pixels[x][y];
    require(msg.value > pixel.soldPrice);
   
    pixel.owner = msg.sender;
    pixel.soldPrice = msg.value;
    pixel.color = color;
    
    emit PixelChanged(x, y, pixel.owner, pixel.soldPrice, pixel.color);
  }
}
