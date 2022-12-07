import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { ethers, utils } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const [inputAddress, setInputAddress] = useState("");
  const [etherscanAddress, setEtherscanAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const defAddress = "0x0000000000000000000000000000000000000000";

  const successToast = async () => {
    setTimeout(() => {
      setEtherscanAddress(inputAddress);
      toast.success(`This is a valid Ethereum address`);
      setLoading(false);
      setInputAddress("");
    }, 2000);
  };

  const invalidToast = () => {
    setTimeout(() => {
      toast.error("This is not a valid Ethereum address");
      setLoading(false);
      setEtherscanAddress('')
      setInputAddress("");
    }, 2000);
  };

  const showTxnUrl = () => {
    if (etherscanAddress) {
      return (
        <div style={{ paddingTop: "20px" }}>
          {" "}
          Valid Address:
          <a
            className={styles.link}
            href={`https://etherscan.io/address/${etherscanAddress}`}
            target={'_blank'}
            rel="noreferrer"
          >
            View on Etherscan.
          </a>
        </div>
      );
    }
    return;
  };

  // const hideTxn = () => {
  //   setTimeout(function () {
  //     setEtherscanAddress("");
  //     document.getElementById("hide").style.visibility = "hidden";
  //   }, 6000);
  // };

  const loader = () => (
    <ColorRing
      visible={true}
      height="20"
      width="30"
      ariaLabel="blocks-loading"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );

  const handleInput = (event) => {
    const { value } = event.target;
    setInputAddress(value);
    console.log(inputAddress);
  };

  const handleClick = (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const isAddress = ethers.utils.isAddress(inputAddress.toLowerCase());
      console.log(isAddress);
      {
        isAddress ? successToast() : invalidToast();
      }
      {
        isAddress && showTxnUrl() 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <Head>
      <title> Eth address Validator</title>

      </Head>

      <div className={styles.main}>
        <div>
          <header className={styles.header}>
            <span>チャンピオン</span>
            <nav className={styles.nav}>
              <ul className={styles.navLinks}>
                <li>
                  {" "}
                  <button className={`${styles.btnAddress} ${styles.btnglow}`}>
                    🤖
                  </button>
                </li>
              </ul>
            </nav>
          </header>
          <h3 className={styles.title}>Validate Your Ethereum Address</h3>
          <div className={styles.description}>
            Please Input your public address in order to ensure it is a valid
            ethereum address
          </div>
          <form>
            <div className={styles.formDiv}>
              <input
                type="text"
                onChange={handleInput}
                placeholder={defAddress}
                value={inputAddress}
              ></input>
              <button
                disable={inputAddress ? true : false}
                onClick={handleClick}
                type="submit"
              >
                {loading ? loader() : "Validate"}
              </button>
            </div>
          </form>
          <div id="hide">{showTxnUrl()}</div>
        </div>
      </div>
    </div>
  );
}
