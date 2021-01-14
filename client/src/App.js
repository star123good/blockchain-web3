import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      console.log("accounts", accounts, "networkId", networkId, "SimpleStorageContract", SimpleStorageContract.networks);

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log("instance", instance);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { web3, accounts, contract } = this.state;

    const price = '10000000000000';
    await contract.methods.sendether().send({ from: accounts[0], value: price });

    await web3.eth.sendTransaction({from: accounts[0], to: accounts[1], value: price});

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.iden().call();

    console.log("response", response);

    // Update state with the result.
    this.setState({ storageValue: response });

    const num = 36;
    const str = "Hello World!";

    const numWei = await web3.utils.toWei(num.toString(), 'microether');
    console.log(`${num} to Wei : ${numWei}`);

    const numHex = await web3.utils.numberToHex(num);
    const numFromHex = await web3.utils.hexToNumber(numHex);
    console.log(`${num} to Hex : ${numHex}, back : ${numFromHex}`);

    const strHex = await web3.utils.asciiToHex(str);
    const strFromHex = await web3.utils.hexToAscii(strHex);
    console.log(`${str} to Hex : ${strHex}, back : ${strFromHex}`);

    const hashStr = await web3.utils.sha3(str);
    console.log(`${str} to Hash : ${hashStr}`);

  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
