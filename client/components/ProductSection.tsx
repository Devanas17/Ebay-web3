import React from 'react'
import toast from 'react-hot-toast'
import Image from "next/image"
import { ethers } from 'ethers';
import {SiEthereum} from "react-icons/si"
import { StarIcon } from '@heroicons/react/24/outline';



const ProductSection = ({name, description, imgURL, category, price, rating}) => {
  // console.log("Price is:", price.toString())
  const priceInNumber = rating.toString()
  console.log("Rating is:", priceInNumber)
  return (
    <div className="border-3 bg-white shadow-md m-5 w-[90%]">
      <div className=" relative w-full ">
        <img src={category}  alt="please" className="rounded-lg w-full h-[150px] object-contain" />
      </div>
      <div className="p-3"> 
        <h2 className='tex-sm font-medium'>{name}</h2>
        <h3 className="text-gray-500 truncate">{description}dfhasdlflsdflsadfs</h3>
        <div className="flex items-center space-x-1"><SiEthereum /> {price}</div>

        <div className="flex items-center space-x-1"><StarIcon className='w-4 h-4' /> <span>{priceInNumber}</span></div>
      </div>
      <button className="m-3 bg-red-500 font-medium text-white text-sm w-28 h-8 rounded-full flex items-center justify-center">Buy Now</button>
    </div> 
  )
}

export default ProductSection