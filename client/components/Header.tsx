import React, {useContext} from 'react'
import {ConnectButton} from "@rainbow-me/rainbowkit"
import Link from 'next/link'
import {BellIcon, ShoppingCartIcon, ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline"
import Image from "next/image"



const Header = () => {
  
  return (
    <div className=' max-w-6xl mx-auto p-3'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center space-x-2 text-sm'>
          <ConnectButton chainStatus="none" showBalance={false}  />

        <p className="hidden md:inline-flex cursor-pointer ">Daily Deals</p>
        <p className="headerLinks">Help & Contact</p>
        </div>
 
        <div className="flex items-center space-x-4 text-sm">
          <p className="headerLinks">Ship to</p>
          <p className="headerLinks">Sell</p>
          <p className="headerLinks">watchlist</p>

          <Link href={"/addItem"} className="flex items-center hover:link">Add to inventory <ChevronDownIcon className='h-4' /> </Link>
          <BellIcon className='h-6 w-6 cursor-pointer' />
          <ShoppingCartIcon className='h-6 w-6 cursor-pointer' />
        </div>
      </nav>

      <section className="flex items-center space-x-2 py-5">
        <div className='h-16 w-16 sm:w-28 md:w-44 cursor-pointer flex-shrink-0'>

        <Link href="/">
          <Image className='object-contain h-full w-full' src="https://links.papareact.com/bdb" alt='Ebay Logo' width={80} height={80} />
        </Link>
        </div>

        <button className="hidden lg:flex items-center space-x-2 w-20">
          <p className='text-sm text-gray-600 '>Shop by Category</p>
          <ChevronDownIcon className='h-4 flex-shrink-0' />
        </button>

 
        <div className="flex items-center border-black border-2 flex-1 space-x-2 px-2 md:px-4 py-2  ">
          <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
          <input className='border-0 outline-0 bg-transparent w-full' type="text" placeholder='Search for Anything' />
        </div>

        {/* <div className=""></div> */}
        <button className="hidden md:inline bg-blue-500 text-white px-5 md:px-10 py-2 border-2 border-blue-500 cursor-pointer">Search</button>
        <Link href="/create">
          <button className="border-2 border-blue-600 px-5 md:px-10 py-2 text-blue-400 hover:bg-blue-600/50 hover:text-white cursor-pointer ">List Item</button>
        </Link>
      </section> 
      <hr />
      <section className='flex items-center justify-center py-4 space-x-6 text-xs whitespace-nowrap md:text-sm px-6'>
        <p className="link">Home</p>
        <p className="link ">Electronics</p>
        <p className="link hidden sm:inline">Video Games</p>
        <p className="link  hidden sm:inline">Home & Garden</p>
        <p className="link hidden md:inline">Health & Beuty</p>
        <p className="link hidden lg:inline">Collectibles and Art</p>
        <p className="link hidden lg:inline">Books</p>
        <p className="link hidden lg:inline">Music</p>
        <p className="link hidden xl:inline">Deals</p>
        <p className="link hidden xl:inline">Other</p>
        <p className="link">More</p>
      </section>
    </div>
  )
}

export default Header