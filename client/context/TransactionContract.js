import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);
  const [auctions, setAuctions] = useState([]);

  const createContract = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const ebay = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(ebay);
    }
  };
  const { address } = useAccount();

  useEffect(() => {
    getItem();
  }, [contract]);

  const sellProduct = async (
    name,
    description,
    category,
    imageUrl,
    price,
    rating
  ) => {
    try {
      if (contract) {
        console.log("Going to pop wallet now to pay gas...");
        const priceInWei = ethers.utils.parseEther(price);
        let txn = await contract.listNewProduct(
          name,
          description,
          category,
          imageUrl,
          priceInWei,
          rating
        );

        await txn.wait();
        console.log("Transaction is: ", txn);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = async () => {
    try {
      if (contract) {
        let products = await contract.getAllItems();
        console.log("products", products);

        for (let i = 0; i <= products.length; i++) {
          const formatedProduct = {
            id: products[i]?.id,
            buyer: products[i].buyer,
            seller: products[i]?.seller,
            name: products[i]?.name,
            description: products[i]?.description,
            category: products[i]?.category,
            imgUrl: products[i]?.imgUrl,
            price: ethers.utils.formatEther(products[i]?.price),
            rating: products[i]?.rating,
          };
          console.log("Formatted ---", formatedProduct);
          setProducts((prev) => [...prev, formatedProduct]);
        }
      }
    } catch (error) {
      console.log(error);
      throw "Not getting Item";
    }
  };

  const buyProduct = async () => {
    try {
      if (contract) {
      }
    } catch (error) {
      console.log(error);
      throw "Buy Product Not working";
    }
  };

  useEffect(() => {
    setUserAddress(address);
    setContract(createContract());
  }, [address]);

  return (
    <TransactionContext.Provider
      value={{
        address,
        contract,
        sellProduct,
        getItem,
        value,
        products,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
