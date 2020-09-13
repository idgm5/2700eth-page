# 2700ETH Homepage
The 2700ETH homepage is a 1 million pixel page powered by a smart contract that allows anyone to bid for each one of the pixels using ether.

## Features
- Each pixel from the canvas is a small auction that allows a future buyer to bid with a higher offer than the previous owner.
- If an owner loses the auction his ether would be available for a refund calling the function "withdraw funds()" from the contract.
- The browser is connected to the blockchain using web3.js including all transactions sent from scripts.

## Instructions to run the web app

+ Open terminal on your workspace with
```
cd /home/projects_workspace/..
```
+ Cloning the project input the next code:
```
git clone git@github.com:idgm5/2700eth-page.git
```
+ Navigate to the folder of the project
```
cd /2700eth-page/
```
Run  `npm install` and then `npm start` finally open your web browser at `http://localhost:3000/`

## Instructions to run the smart contract
- Install solidity 7.1
- Install solidity compiler with `npm install -g solc`
- Inside of contracts directory run `solcjs 2700EtherPage.sol --bin`
- Use bin as parameter to send a new transaction to your blockchain in order to  deploy the contract.
- Copy contract address and replace the current one in `src/index.js`.
- Send a transaction to method `ColorPixel` with parameters `x,y,["0x00","0x00","0x00"]` including a value in wei greater than 0.
- A transaction needs to be funded in order to succeed, if not it will be rejected and it could result in a loss of gas.

## How bidding works
- Once a user send a new transaction to acquire a pixel, it has to provide a value in the transaction which equals to the amount of ether that it will offer to the smart contract.
- The smart contract will compare the previous value from the pixel, and if the new value is greater then it will refund the previous owner and it will keep the new ether locked for this pixel.
- Once an owner is refunded, this can request a withdraw of funds making a call to the smart contract.

## Built With

* Node.js
* JavaScript
* Solidity 7.1

Tools used on this project

- Atom Editor
- Remix IDE

## Author

👤 **Isaac Gonzalez**

- GitHub: [@idgm5](https://github.com/idgm5)
- Twitter: [@idgm5](https://twitter.com/idgm5)
- Linked-in: [Isaac Gonzalez](https://www.linkedin.com/in/isaacmunguia)

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues](https://github.com/idgm5/catalogue/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

+ [Newline.co - Learn to build this Dapp here](https://www.newline.co/courses/million-ether-homepage).

## License

This project is [MIT](lic.url) licensed.
