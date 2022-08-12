# Blockchain controlled smart lock using Arduino

This tutorial demonstrates how to build a smart lock that can be controlled from a smart contract.  
We will use popular Arduino boards like ESP32 and Arduino Nano 33 IoT and we will connect them to the IoTex blockchain.

## First steps

- Clone the repository.  
- Open a terminal and change directory to `SmartLockBlockchain`.  
- Run `npm install` to install the required dependencies.  
- Install Arduino IDE and install the [IoTeX-blockchain-client](https://www.arduino.cc/reference/en/libraries/iotex-blockchain-client/) library.  
- If you are using Nano33 IoT, install the [FlashStorage](https://www.arduino.cc/reference/en/libraries/flashstorage/) and [WiFiNina](https://www.arduino.cc/reference/en/libraries/wifinina/) Arduino libraries.  

## The blockchain smart contract

We will create a smart contract that stores the device state in the IoTeX layer 1 blockchain and exposes functions for reading and changing the lock state.  
A simple smart contract for this tutorial is located [here](SmartLockBlockchain/contracts/Lock.sol).  

Note that this is a very simplified smart contract, for the purposes of this tutorial. It has several limitations, including:

- The contract implements the Ownable interface. Only the owner of the contract can read or write the smart lock state.  
- The status of the lock is stored in the public blockchain in an unencrypted manner.  

### Deploying the contract

- Open a terminal and change directory to `SmartLockBlockchain`.  
- Create your `.env` file from the template by running `cp .env-template .env`.  
- Replace `<your-private-key>` with the private key you want to use to deploy the contract in `.env`.  
- Ensure that the deployer address has enough IOTX tokens for the deployment. You can use the faucet to get testnet IOTX.  
- Run `npx hardhat run scripts/deploy.js --network <NETWORK>` replacing `<NETWORK>` for either `testnet` or `mainnet`.  

If the deployment is successful, you should see something similar to this:  

```terminal
$npx hardhat run scripts/deploy.js --network testnet
Compiled 3 Solidity files successfully
Lock deployed to:  0xbB21eD8dB133F0e4216F712D19C68F6b5af6b6e1
Lock state:  false
```

Take a note of the contract address. You will need to program it into the device as indicated in the next step.  

## The Arduino smart lock

We will create a DIY smart lock by wiring a magnetic lock to an Arduino board.  

### Supported devices

At the moment, the sketch can be built for ESP32 and Arduino Nano 33 IoT.  

### Wiring

Simply wire the magnetic lock to a digital output pin in the microcontroller. You would need a relay to power the lock.  

See an example of the wiring below:

- [ ] Wiring example

### Building and flashing the firmware

A simple sketch for the Arduino board is located [here](SmartLockDevice).  
The sketch "polls" the contract `isOpen()` function to read the lock state from the blockchain. Then it sets the relay pin to either open or close the lock based on the contract state.  

You need to configure the sketch to suit your environment following the steps below:  

- Open the `SmartLockDevice` fodler in Arduino IDE.  
- Open the `secrets.h` file and replace the values with yours.  
- Select your board and port in the Arduino IDE.  
- Click the upload button and wait until the firmware is build and flashed to your device.  

## Opening/closing the lock

In order to open and close the lock, you need to call the `setState()` function of your contract.  
You can do this with the [ioctl](https://docs.iotex.io/reference/ioctl-cli-reference) command line tool. Follow the [installation](https://docs.iotex.io/reference/ioctl-cli-reference/installation) instructions to install the tool in your pc.  

Once you have ioctl installed you can follow the next steps to configure it:  

- Import the contract owner private key with `ioctl account import key smartLock`.  
- Set the default signer account to the smart lock owner account `ioctl config set defaultacc smartLock`.  
- Point ioctl to testnet if you are using testnet `ioctl config set endpoint api.testnet.iotex.one:443`.  
- Change directory into the `SmartLockBlockchain` directory.  

The you can use the follwing command to open the lock:  
`ioctl contract invoke function io1x6y5gjty378vjwqz7ahdkf5thfeum9q23h394w Lock.abi setState --with-arguments '{"open": true }'`  

And the following one to close it:  
`ioctl contract invoke function io1x6y5gjty378vjwqz7ahdkf5thfeum9q23h394w Lock.abi setState --with-arguments '{"open": false }'`

After you run each command, wait for some seconds to ensure that the transaction is confirmed and the device opens or closes the lock.  
