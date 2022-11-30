import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";
import { useAccount } from "wagmi";

const ethereumClient = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
  }
};

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [products, setProducts] = useState([]);

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
      const priceInWei = ethers.utils.formatEther(price, "ether");

      await contract.listNewProduct(
        name,
        description,
        category,
        imageUrl,
        priceInWei,
        rating
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserAddress(address);
    setContract(ethereumClient());
  }, [address]);

  return (
    <TransactionContext.Provider value={{ address, contract, sellProduct }}>
      {children}
    </TransactionContext.Provider>
  );
};
