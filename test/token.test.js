const assert = require('assert');
const Token = artifacts.require("DisburseToken");

contract("Disburse Token", () => {

    it("it can assign administrator", async () => {
        var token = await Token.deployed();
        var admin = await token.admin.call();
        assert.ok(admin.indexOf('0x' >= 0));  
    });
    
});