// BY GOD'S GRACE ALONE

import { useState } from "react";
import server from "./server";
import  * as secp from "ethereum-cryptography/secp256k1"
import {keccak256} from "ethereum-cryptography/keccak"
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils"
import { useEffect } from "react";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");

  const hashMessage = (message) =>{
    const messageInBytes = utf8ToBytes(message);
    return keccak256(messageInBytes);
  }

  const signMessage = async (message, privateKey) => {
    const hash = hashMessage(message);
    const [signature, recovery] =
      secp.secp256k1.sign(hash, privateKey);

    return { hash, signature, recovery };
  }

  async function recoverPublicKey(message, signature, recovery) {
    const hash = hashMessage(message);

    return await signature.recoverPublicKey(hash).toRawBytes();
  }

  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function transfer(evt) {
    evt.preventDefault();
    try {

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: privateKey,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type a public key, without the 0x"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
