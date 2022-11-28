import React, { useState, createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  return (
    <TransactionContext.Provider value={{}}>
      {children}
    </TransactionContext.Provider>
  );
};
