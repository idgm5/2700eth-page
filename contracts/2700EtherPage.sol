pragma solidity ^0.7.1;

contract TwentySevenHundredEtherPage {
  bytes3[100][1000] public pixels;
  
  event PixelChanged(
      uint x,
      uint y,
      bytes3 color
   );
    
  function colorPixel(uint x, uint y, bytes3 color) public {
    pixels[x][y] = color;
    emit PixelChanged(x, y, color);
  }
}
