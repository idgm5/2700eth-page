pragma solidity ^0.4.11;

contract 2700EtherPage {
  bytes3[100][1000] public pixels;

  function colorPixel(uint x, uint y, bytes3 color){
    pixels[x][y] = color;
  }
}
