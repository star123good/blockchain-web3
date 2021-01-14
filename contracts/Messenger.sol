// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Messenger {
  address owner;
  string[] messages;

  constructor() public {
    owner = msg.sender;
  }

  function add(string memory newMessage) public {
    // require(msg.sender == owner);
    messages.push(newMessage);
  }

  function count() view public returns(uint) {
    return messages.length;
  }

  function get(uint index) view public returns(string memory) {
    return messages[index];
  }
}
