// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  string public iden;

  function sendether() public payable {
    iden = "Sendehter got called";
  }
  
  // receive() external public {
  //   iden = "fallback got called";
  // }

  function withdraw() public {
    address my = address(this);
    uint256 bal = my.balance;
    (msg.sender).transfer(bal);
  }
}
