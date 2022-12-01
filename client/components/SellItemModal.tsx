import React, {useState, useContext} from "react"
import {Uploader} from "uploader"
import  toast, { Toaster }  from "react-hot-toast"
import {TransactionContext} from "../context/TransactionContract"


const uploader = new Uploader({
    apiKey: "free",
})

const notify = () => toast('Please fill all the details!');


const SellItemModal = () => {
const {sellProduct} = useContext(TransactionContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [imgUrl, setImgUrl] = useState('')
 console.log(name)
 console.log(description)
 console.log(category)
 console.log(price)
 console.log(rating)
 
  const handleUploadProductImage =async () => {
    uploader.open({multi: false}).then((files: string | any[]) => {
      if(files.length === 0){
        alert("No files selected.")
      } else {
        setImgUrl(files[0].fileUrl)  
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    if (!name || !description || !category || !price || !rating || !imgUrl){

      toast.error("Please fill all the details")
      return
    }

    toast.promise(
      sellProduct(name, description, category, imgUrl, price, rating),
      {
        loading: 'Listing Item... This can take a few seconds. ⏳',
        success: 'Item listed! 🎉',
        error: 'Error listing item. 😢',
      },
    )
  }


  return (
    <div className='sell-container space-y-3  p-7 m-6 border-2 border-gray-300 rounded-md min-w-[400px] bg-white'>
    <div className='sell-input-container flex flex-col px-2 '>
      <span className='sell-input-title text-lg font-semibold px-1'>Name</span>
      <input
        className='sell-input-textbox text-base font-normal border border-gray-500 p-3 rounded-sm'
        type='text'
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
    <div className='sell-input-container flex flex-col px-2'>
      <span className='sell-input-title text-lg font-semibold px-1'>Image</span>
      <button
        className='sell-input-button text-base text-white bg-black font-semibold border-0 px-3 py-1 rounded-md'
        onClick={handleUploadProductImage}
      >
        Upload Product image
      </button>
    </div>
    <div className='sell-input-container flex flex-col px-2'>
      <span className='sell-input-title text-lg font-semibold px-1'>Description</span>
      <textarea
        className='sell-input-textbox  text-base font-normal border border-gray-500 p-3 rounded-sm'
        // rows='4'
        type='text'
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
    </div>
    <div className='sell-input-container flex flex-col px-2'>
      <span className='sell-input-title text-lg font-semibold px-1'>Category</span>
      <input
        className='sell-input-textbox text-base font-normal border border-gray-500 p-3 rounded-sm'
        type='text'
        value={category}
        onChange={event => setCategory(event.target.value)}
      />
    </div>
    <div className='sell-input-container flex flex-col px-2'>
      <span className='sell-input-title text-lg font-semibold px-1'>Price</span>
      <input
        className='sell-input-textbox text-base font-normal border border-gray-500 p-3 rounded-sm'
        type='text'
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
    </div>
    <div className='sell-input-container flex flex-col px-2'>
      <span className='sell-input-title text-lg font-semibold px-1'>Rating</span>
      <input
        className='sell-input-textbox text-base font-normal border border-gray-500 p-3 rounded-sm'
        type='text'
        value={rating}
        onChange={event => setRating(event.target.value)}
      />
    </div>
     
    <button onClick={handleSubmit} className='sell-input-button text-base text-white bg-black font-semibold border-0 ml-2 px-3 py-1 rounded-md'>
      List Item
    </button>
  </div>
  )


}

export default SellItemModal