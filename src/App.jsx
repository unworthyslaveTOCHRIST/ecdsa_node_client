import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKeySender, setPublicKeySender] = useState("")

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey = {privateKey}
        setPrivateKey={setPrivateKey}
        publicKeySender = {publicKeySender}
        setPublicKeySender = {setPublicKeySender}
      />
      <Transfer 
        setBalance={setBalance} 
        address={address} 
        privateKey = {privateKey} 
        publicKeySender = {publicKeySender}
        setPublicKeySender = {setPublicKeySender} 
      />
    </div>
  );
}

export default App;
