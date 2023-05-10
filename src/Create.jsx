/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import contractAddress from "./contracts/contract-address.json";
import CMArtifact from "./contracts/CM.json";
import { ethers } from "ethers";
import JsonToCard from "./JsonToCard";
import hero0 from './assets/hero0.svg';
import hero1 from './assets/hero1.svg';
import hero2 from './assets/hero2.svg';
import hero3 from './assets/hero3.svg';
import hero4 from './assets/hero4.svg';
import hero5 from './assets/hero5.svg';
import hero6 from './assets/hero6.svg';
import hero7 from './assets/hero7.svg';
import hero8 from './assets/hero8.svg';

function Contract() {
    const ERROR_CODE_TX_REJECTED_BY_USER = 401;
    const [cm, setCm] = useState(undefined);
    const [selectedAddress, setSelectedAddress] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState("");
    // eslint-disable-next-line
    const [networkError, setNetworkError] = useState(undefined);
    // eslint-disable-next-line
    const [transactionError, setTransactionError] = useState(undefined);
    // eslint-disable-next-line
    const [txBeingSent, setTxBeingSent] = useState(undefined);

    const [np, setNpToCreate] = useState("");
    const [npcost, setNpCost] = useState("");

    const [auctionDatabefore, setAuctionDatabefore] = useState([]);

    const [npBid, setNpToBid] = useState("");
    const [npBidCost, setNpToBidCost] = useState("");
    const [npEndBid, setNpToEndBid] = useState("");
    const [npSetDest, setNpSetDest] = useState("");
    const [dest, setDest] = useState("");
    const [checknp, setChecknp] = useState("");
    const [checknpre, setChecknpre] = useState("");
    const [checknprepre, setChecknprepre] = useState("");

    const connectWallet = async () => {
        setNetworkError(undefined);
        setTransactionError(undefined);
        const [selectedAddress] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setSelectedAddress(selectedAddress);

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const cm = new ethers.Contract(
            contractAddress.CM,
            CMArtifact.abi,
            provider.getSigner(0)
        );
        setCm(cm);
    };

    const createNumperPlate = async (np) => {
        try {
            setNetworkError(undefined);
            setTransactionError(undefined);
            const tx = await cm.createNumberPlate(np,
                {
                    value: ethers.utils.parseEther((npcost).toString()),
                });
            setTxBeingSent(tx.hash);
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
        } catch (err) {
            if (err.code !== ERROR_CODE_TX_REJECTED_BY_USER) {
                console.error(err);
                setTransactionError(err);
                setErrorMsg(err.message);
            }
        } finally {
            setTxBeingSent(undefined);
        }
    };

    const getAuctionData = async () => {
        try {
            setNetworkError(undefined);
            setTransactionError(undefined);
            const rx = await cm.getAuctionData();
            /*const formattedData = rx.map((auction) => ({
                numberPlate: auction.numberPlate.toString(),
                highestBid: auction.highestBid.toString(),
                timeLeft: auction.timeLeft.toString(),
              }));*/
            setAuctionDatabefore(rx);
            if (rx.status === 0) {
                throw new Error("Reception failed");
            }
            /*fetchTokenBalance();*/
        } catch (err) {
            if (err.code !== ERROR_CODE_TX_REJECTED_BY_USER) {
                console.error(err);
                setTransactionError(err);
                setErrorMsg(err.message);
            }
        }
    };

    const bidAuctionNP = async (npBid) => {
        try {
            setNetworkError(undefined);
            setTransactionError(undefined);
            const tx = await cm.bidOnAuction(npBid,
                {
                    value: ethers.utils.parseEther((npBidCost).toString()),
                });
            setTxBeingSent(tx.hash);
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
        } catch (err) {
            if (err.code !== ERROR_CODE_TX_REJECTED_BY_USER) {
                console.error(err);
                setTransactionError(err);
                setErrorMsg(err.message);
            }
        } finally {
            setTxBeingSent(undefined);
        }
    };

    const EndbidAuctionNP = async (npEndBid) => {
        try {
            setNetworkError(undefined);
            setTransactionError(undefined);
            const tx = await cm.endAuction(npEndBid);
            setTxBeingSent(tx.hash);
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
        } catch (err) {
            if (err.code !== ERROR_CODE_TX_REJECTED_BY_USER) {
                console.error(err);
                setErrorMsg(err.message);
            }
        } finally {
            setTxBeingSent(undefined);
        }
    };
    const ContractSetDest = async (npSetDest,dest) => {
        try {
            setNetworkError(undefined);
            setTransactionError(undefined);
            const tx = await cm.setDestination(npSetDest,dest);
            setTxBeingSent(tx.hash);
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
        } catch (err) {
            if (err.code !== ERROR_CODE_TX_REJECTED_BY_USER) {
                console.error(err);
                setErrorMsg(err.message);
            }
        } finally {
            setTxBeingSent(undefined);
        }
    };

    const CheckNP = async (checknp) => {
        try {
            setNetworkError(undefined);
            setTransactionError(undefined);
            setChecknprepre(dest);
            const rx = await cm.numberPlates(checknp);
            const json = JSON.stringify(rx);
            setChecknpre(json);
            if (rx.status === 0) {
                throw new Error("Transaction failed");
            }
        } catch (err) {
            if (err.code !== ERROR_CODE_TX_REJECTED_BY_USER) {
                console.error(err);
                setErrorMsg(err.message);
            }
        } finally {
            setTxBeingSent(undefined);
        }
    };


    useEffect(() => {
        connectWallet();
    }, []);

    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts[0] && accounts[0] !== selectedAddress) {
            connectWallet();
        }
    });

    if (window.ethereum === undefined) {
        return <div>No wallet detected</div>;
    }

    return (
        <div className="App">
            <img className="hero0" src={hero0} alt="0" />           
            <section className="hero1">
            <img className="hero1" src={hero1} alt="1" />
                <section className="Create-np">
                <div className="words">
                <h3>Create NumberPlate</h3>
                <div>
                    <p >
                    <span>Account Address:</span> <code>{selectedAddress}</code>
                    </p>
                    <p>NumberPlate: </p>
                    <input
                        type="text"
                        id="numberplate"
                        value={np}
                        onChange={(e) => setNpToCreate(e.target.value)}
                        placeholder="Numberplate"
                    />
                    <p>Set Minimum Bid:</p>
                    <input
                        min={0.001}
                        type="number"
                        id="initial cost"
                        value={npcost}
                        onChange={(e) => setNpCost(e.target.value)}
                        placeholder="initial cost"
                    />
                    <button onClick={() => createNumperPlate(np)} >
                        Checkout 🚀
                    </button>
                </div>
                <p className="subtext">
                    Number Plate Minimal cost <code> 0.001 ETH</code>
                </p>
                </div>
                </section>
            </section>
            <img className="hero0" src={hero3} alt="0" />
            <section className="aution-data">
                <h3>NumberPlate in Auction</h3>
                <button onClick={() => getAuctionData()} >
                    Get Auction Data Now 🚀
                </button>
                <JsonToCard jsonData={auctionDatabefore}/>
            </section>
            <br />
            <br />
            <section className="hero2">
            <section className="buy-aution-NP">
                <h3>Bid NumberPlate in Auction</h3>
                <p>Numberplate:</p>
                <input
                        type="text"
                        id="numberplatebid"
                        value={npBid}
                        onChange={(e) => setNpToBid(e.target.value)}
                        placeholder="Numberplate to Bid"
                    />
                <p>Bidding:</p>
                <input
                        min={0.002}
                        type="number"
                        id="biddingbid"
                        value={npBidCost}
                        onChange={(e) => setNpToBidCost(e.target.value)}
                        placeholder="bidding"
                    />
                    <br />
                <button onClick={() => bidAuctionNP(npBid)} >
                    Bid NumberPlate in Auction  Now 🚀
                </button>
            </section>
            <img className="hero2" src={hero2} alt="1" />
            </section>
            <br />
            <br />
            <img className="hero0" src={hero4} alt="0" /> 
            <section className="hero5">
            <section className="hero4">
            <section className="endAuction">
                <h3>End Bidding in Auction</h3>
                <input
                        type="text"
                        id="numberplatebid"
                        value={npEndBid}
                        onChange={(e) => setNpToEndBid(e.target.value)}
                        placeholder="Numberplate to End Bid"
                    />
                <br />
                <button onClick={() => EndbidAuctionNP(npEndBid)} >
                    End Bid NumberPlate in Auction Now 🚀
                </button>
                <p>{errorMsg}</p>
            </section>
            <section className="setDestination">
                <h3>Set your external Destination if you own a NP</h3>
                <input
                        type="text"
                        id="numberplatebid"
                        value={npSetDest}
                        onChange={(e) => setNpSetDest(e.target.value)}
                        placeholder="Numberplate"
                    />
                    <br />
                <input
                        type="text"
                        id="numberplatebid"
                        value={dest}
                        onChange={(e) =>setDest(e.target.value)}
                        placeholder="Destination"
                    />
                <br />
                <button onClick={() => ContractSetDest(npSetDest,dest)} >
                    Set your external Destination Now 🚀
                </button>
            </section>
            </section>
            <img className="hero6" src={hero5} alt="1" />
            </section>
            <br />
            <br />
            <section className="check">
            <img className="hero0" src={hero6} alt="1" />
            <input
                        type="text"
                        id="numberplatebid"
                        value={checknp}
                        onChange={(e) => setChecknp(e.target.value)}
                        placeholder="Numberplate to check"
                    />
                    <br />
            <button onClick={() => CheckNP(checknp)} >
                    Check NumberPlate 🚀
            </button>
            <br />
            <h2>UniLink: {checknprepre}</h2>
            <br />
            </section>
            <img className="hero0" src={hero7} alt="1" />
            <img className="hero0" src={hero8} alt="1" />
            <section className="check">
            <input
                        type="text"
                        id="numberplatebid"
                        value={checknp}
                        onChange={(e) => setChecknp(e.target.value)}
                        placeholder="Numberplate to push to auction"
                    />
                    <br />
            <button onClick={() => CheckNP()} >
                NumberPlate Auction  🚀
            </button>
            <br />
            <br />
            </section>
        </div>

    );
}

export default Contract;