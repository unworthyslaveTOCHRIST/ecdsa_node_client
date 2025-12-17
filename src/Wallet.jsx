// ALL THANKS AND GLORY TO THE AND my ONLY GOD AND LORD JESUS CHRIST ALONE
// BY GOD'S GRACE ALONE

import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak"
import {toHex} from "ethereum-cryptography/utils"
import {useState} from "react"




function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, publicKeySender, setPublicKeySender}) {
 async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKeySender = toHex(secp.secp256k1.getPublicKey(privateKey))
    setPublicKeySender(publicKeySender)
    if (publicKeySender) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKeySender}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your private key, without the 0x" value={privateKey} onChange={onChange}></input>
      </label>
      <label>
        Corresponding Public Key
        <input placeholder="Type your private key, without the 0x" value={toHex(secp.secp256k1.getPublicKey(privateKey))} onChange={onChange} disabled ></input>
      </label>
     
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

// "graciously completed first alchemy project"