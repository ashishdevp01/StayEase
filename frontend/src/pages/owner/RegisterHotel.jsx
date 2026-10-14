import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

import toast from 'react-hot-toast'

const RegisterHotel = () => {
  const {axios, navigate} = useContext(AppContext);
  const [data, setData] = useState({
    hotelName: "",
    hotelAddress:"",
    rating: "",
    price: "",
    amenities: "",
    image: null,
  });

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)


  const handlerchange = (e) =>{
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleimagechange = (e) =>{
    const selectedFile =  e.target.files[0];
    setFile(selectedFile)
    setData({...data, image: selectedFile });
    if(selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)
      setPreview(imageUrl)
    }
  }

  const handlersubmit = async (e) =>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("hotelName", data.hotelName);
  formData.append("hotelAddress", data.hotelAddress);
  formData.append("rating", data.rating);
  formData.append("price", data.price);
  formData.append("amenities", data.amenities);
  formData.append("image", file);

  try {
const { data } = await axios.post("/api/hotel/register", formData)
     if(data.success) {
      toast.success(data.message);
      navigate("/owner");
     } else {
      toast.error(data.message);
     }
    
  } catch (error) {
    toast.error(error.message || "something went wrong");
  }
  
  }
  return (
   
      <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={handlersubmit} className="md:p-10 p-4 space-y-5 max-w-lg" encType="multipart/form-data">
                <div>
                    <p className="text-base font-medium">Hotel Image</p>
                    <div className='w-full my-4'>
                      {/* hotel image preview */}
                      {preview && (
                        <div className='mb-3 flex jsutify-center'>
                          <img src={preview} alt="" 
                          className='w-24 h-24 object-cover rounded shadow' />
                        </div>
                      )}

                      {/* file upload */}
                      <input 
                      type="file"
                      accept='image/*'
                      onChange={handleimagechange}
                      className='block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 cursor-pointer' 
                      />
                       
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium"htmlFor="product-name">
                      Hotel Name</label>
                    <input 
                      type="text" 
                      name='hotelName'
                      value={data.hotelName}
                      onChange={handlerchange}
                      placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" 
                      required />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium"
                     htmlFor="product-description">
                      Hotel Address
                      </label>
                    <textarea 
                    name='hotelAddress'
                      value={data.hotelAddress}
                      onChange={handlerchange}
                     rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border
                      border-gray-500/40 resize-none"
                       placeholder="Type here">
                       </textarea>
                </div>
                
                
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium"
                         htmlFor="product-price">
                           Rating
                          </label>
                        <input 
                        type="number"
                        name='rating'
                        value={data.rating}
                        onChange={handlerchange} 
                        placeholder="0" 
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" 
                        required />
                    </div>
                    
                </div>
                
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium"
                         htmlFor="product-price">
                           Price
                          </label>
                        <input 
                        type="number"
                        name='price'
                        value={data.price}
                        onChange={handlerchange} 
                        placeholder="0" 
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" 
                        required />
                    </div>
                     </div>
                    <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium"
                     htmlFor="product-description">
                      Hotel Amenities
                      </label>
                    <textarea 
                      name='amenities'
                      value={data.amenities}
                      onChange={handlerchange}
                     rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border
                      border-gray-500/40 resize-none"
                       placeholder="Type here">
                       </textarea>
                </div>
                    
               
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded">
                  Register Hotel
                  </button>
            </form>
        </div>
   
  )
}
  
export default RegisterHotel;

