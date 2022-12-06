import React, {useState, useEffect, useContext} from "react"
import { ethers } from 'ethers';
import Head from 'next/head'
import Image from 'next/image'
import toast, {Toaster} from "react-hot-toast"
import Modal from "react-modal"
import { useRouter } from 'next/router'
import Header from '../components/Header';
import SellItemModal from '../components/SellItemModal';
import Link from 'next/link';
import {modalStyles} from "../utils/constant"
import {TransactionContext} from "../context/TransactionContract"
import Product from "../components/Product";



const notify = () => toast('Here is your toast.');
Modal.setAppElement('#__next')  

export default function Home() {
  const router = useRouter()
  const {getItem, value, Auctions, auctions, sellProduct, products} = useContext(TransactionContext)



  return (
    <div className="App">
      <div>
        <Toaster position='top-center' />
      </div>

      <Header />

      <div className="max-w-6xl mx-auto space-x-6 px-4">
        <Link href="/?sell=1">
        <button className='bg-blue-600 text-white px-5 cursor-pointer py-2 rounded-sm hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition ease-in duration-200 text-sm'>Sell Item</button>
        </Link>
        <button className=' text-blue-600 px-5 cursor-pointer py-2 rounded-sm hover:bg-blue-600 hover:text-white border-2 border-blue-600 transition ease-in duration-200 text-sm'>Create Auction</button>
      </div>

     
      <div className="max-w-6xl mx-auto p-4"> 
          <section className='container-results'>
            <div className='ebayclone-Hits'>
              <div className='ebayclone-Hits-list'>
                {products.map((item: any, index: React.Key | null | undefined) => {
                  return <Product product={item} key={index} />
                })}
              </div>
            </div>

          </section>
         </div>
 
      <Modal
        isOpen={!!router.query.sell}
        onRequestClose={() => router.push('/')}
        style={modalStyles}
      >
        <SellItemModal/>
      </Modal>
    </div>
  )
}
