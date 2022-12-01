import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";
import { useAccount } from "wagmi";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);

  const { address } = useAccount();

  const sellProduct = async (
    name,
    description,
    category,
    imageUrl,
    price,
    rating
  ) => {
    if (!contract) return;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const ebay = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Going to pop wallet now to pay gas...");
        const priceInWei = ethers.utils.parseEther(price);
        let txn = await ebay.listNewProduct(
          name,
          description,
          category,
          imageUrl,
          priceInWei,
          rating
        );

        await txn.wait();
        console.log("Transaction is: ", txn);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllItems = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const ebay = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await ebay.getNumberOfProducts();
        setValue(nftTxn.toNumber());
      }
    } catch (error) {
      console.log(error);
      throw "Ethereum does not found";
    }
  };

  useEffect(() => {
    setUserAddress(address);
  }, [address]);

  return (
    <TransactionContext.Provider
      value={{ address, contract, sellProduct, getAllItems, value }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
