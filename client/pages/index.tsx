import { ethers } from 'ethers';
import Head from 'next/head'
import Image from 'next/image'
import {Toaster} from "react-hot-toast"
import Modal from "react-modal"
import router, { useRouter } from 'next/router'
import Header from '../components/Header';
import SellItemModal from '../components/SellItemModal';
import Link from 'next/link';
import {modalStyles} from "../utils/constant"


Modal.setAppElement('#__next')

export default function Home() {
 

  return (
    <div className="App">
      <Header />

      <div className="max-w-6xl mx-auto space-x-6 px-4">
        <Link href="/?sell=1">
        <button className='bg-blue-600 text-white px-5 cursor-pointer py-2 rounded-sm hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition ease-in duration-200 text-sm'>Sell Item</button>
        </Link>
        <button className=' text-blue-600 px-5 cursor-pointer py-2 rounded-sm hover:bg-blue-600 hover:text-white border-2 border-blue-600 transition ease-in duration-200 text-sm'>Create Auction</button>
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
