const Web3 = require("web3");

const TOKEN_JSON = require('./build/contracts/DisburseToken.json');
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let toAddress = "0x58FaAbD4416698041526Be00e5160bB6a28Ab07b";

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
  console.log('Contract Address: ' + TOKEN_JSON.networks[5777].address);
  console.log('Mint account: ' + mintAccount);

  let token = new web3.eth.Contract(TOKEN_JSON.abi, TOKEN_JSON.networks[5777].address);

  let balance = await token.methods.balanceOf(mintAccount).call();
  console.log('Mint balance: ' + balance);

  balance = await token.methods.balanceOf(toAddress).call();
  console.log('Wallet balance: ' + balance);

  let value = '1000000000000000000'
  let result = await token.methods.transfer(toAddress, value).send({from: mintAccount});
  //console.log(result);

  balance = await token.methods.balanceOf(mintAccount).call();
  console.log('New Mint balance: ' + balance);

  balance = await token.methods.balanceOf(toAddress).call();
  console.log('New wallet balance: ' + balance);

  console.log('Account transfer complete');
}

var contractTransfer = async () => {

  // TODO: Create a solidity test contract that will receive ERC20 tokens

}

accountTransfer();
contractTransfer();