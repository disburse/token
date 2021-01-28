const Web3 = require("web3");

const TOKEN_JSON = require('./build/contracts/DisburseToken.json');
const CONTRACT_JSON = require('./build/contracts/Contract.json');

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let toAddress = "0x58FaAbD4416698041526Be00e5160bB6a28Ab07b";
let tokenAddress = TOKEN_JSON.networks[5777].address;
let contractAddress = CONTRACT_JSON.networks[5777].address;

var getNetwork = async () => {
  return await web3.eth.net.getId();
}

var getAccount = async () => {
  var accounts = await web3.eth.getAccounts();
  return accounts[0];
}

var accountTransfer = async () => {

  let id = await getNetwork();
  let mintAccount = await getAccount();
  console.log('Network: ' + id)
  console.log('Token Address: ' + tokenAddress);
  console.log('Mint account: ' + mintAccount);
  console.log();

  let token = new web3.eth.Contract(TOKEN_JSON.abi, tokenAddress);

  let balance = await token.methods.balanceOf(mintAccount).call();
  console.log('Mint balance: ' + balance);

  balance = await token.methods.balanceOf(toAddress).call();
  console.log('Initial wallet balance: ' + balance);

  let value = '1000000000000000000'
  let result = await token.methods.transfer(toAddress, value).send({from: mintAccount});
  //console.log(result);

  console.log();
  balance = await token.methods.balanceOf(mintAccount).call();
  console.log('New mint balance: ' + balance);

  balance = await token.methods.balanceOf(toAddress).call();
  console.log('New wallet balance: ' + balance);

  console.log();
  console.log('Account transfer complete');
}

var contractTransfer = async () => {

  // TODO: Create a solidity test contract that will receive ERC20 tokens

  console.log('Contract: ' + contractAddress);
  console.log();

  let mintAccount = await getAccount();

  let token = new web3.eth.Contract(TOKEN_JSON.abi, TOKEN_JSON.networks[5777].address);

  let balance = await token.methods.balanceOf(mintAccount).call();
  console.log('Mint balance: ' + balance);

  balance = await token.methods.balanceOf(contractAddress).call();
  console.log('Initial contract balance: ' + balance);

  let value = '1000000000000000000'
  let result = await token.methods.transfer(contractAddress, value).send({from: mintAccount});

  console.log();
  balance = await token.methods.balanceOf(mintAccount).call();
  console.log('New mint balance: ' + balance);

  balance = await token.methods.balanceOf(contractAddress).call();
  console.log('New contract balance: ' + balance);

  console.log();
  console.log('Contract transfer complete');

}

accountTransfer();
//contractTransfer();