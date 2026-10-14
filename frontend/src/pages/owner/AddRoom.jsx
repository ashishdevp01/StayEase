import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Upload } from "lucide-react";
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const  AddRoom = () => {

  const {axios, navigate} = useContext(AppContext)
  const [roomData, setRoomData] = useState({
    hotel: "",
    roomType: "",
    pricePerNight: "",
    description: "",
    images: [],
    amenities: "",
    isAvailable: true,
  });

  const [hotelsData, setHotelData] = useState([]);
  const fetchOwnerHotels = async () => {
         try {
             const {data} = await axios.get("/api/hotel/get");
             if(data.success) {
                 setHotelData(data.hotels);
             } else {
                 toast.error(data.message);
             }
         } catch (error) {
              toast.error(data.message);
              toast.error(error.message || "Error fetching hotels.");
         }
     }
  useEffect(() => {
     fetchOwnerHotels();
  }, []);


  // const handlerchange = (e) =>{
  //   setRoomData({...roomData, [e.target.name]: e.target.checked});
  // }

  const handlerchange = (e) => {
  const { name, value, type, checked } = e.target;

  setRoomData({
    ...roomData,
    [name]: type === "checkbox" ? checked : value
  });
};


  const handleimagechange = (e, index) =>{
    const file = e.target.files[0];
    if(file) {
      const updatedImages = [...roomData.images];
      updatedImages [index] = file;
      setRoomData({...roomData, images: updatedImages });
    }
  }

  const handlersubmit = async (e) =>{
  e.preventDefault();
  
  const formData = new FormData();

formData.append("hotel", roomData.hotel);
formData.append("roomType", roomData.roomType);
formData.append("pricePerNight", roomData.pricePerNight);
formData.append("description", roomData.description);
formData.append("isAvailable", roomData.isAvailable);
formData.append("amenities", roomData.amenities);

roomData.images
  .filter((image) => image)
  .forEach((image) => {
    formData.append("images", image);
  });

try {
  const { data } = await axios.post("/api/room/add", formData);

  if (data.success) {
    toast(data.message);
    navigate("/owner/rooms");
  } else {
    toast.error(data.message);
  }
} catch (error) {
  console.log("Backend error:", error.response?.data);
  toast.error(error.response?.data?.message || error.message);
}
}
  return (
   
      <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={handlersubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
                

                <div>
  <p className="text-base font-medium">Room Image</p>

  <div className="flex flex-wrap items-center gap-3 mt-2">
    {Array(4).fill("").map((_, index) => (
      <label
        key={index}
        htmlFor={`image${index}`}
        className="cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          id={`image${index}`}
          hidden
          onChange={(e) => handleimagechange(e, index)}
        />

        {roomData.images[index] ? (
          <img
            className="w-24 h-24 object-cover rounded-md"
            src={URL.createObjectURL(roomData.images[index])}
            alt="room"
          />
        ) : (
          <div className="w-24 h-24 rounded-md border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
            <Upload className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">
              Upload
            </span>
          </div>
        )}
      </label>
    ))}
  </div>
</div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium"htmlFor="product-name">
                      Room Type</label>
                    <input 
                      type="text" 
                      name='roomType'
                      value={roomData.roomType}
                      onChange={handlerchange}
                      placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" 
                      required />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium"
                     htmlFor="product-description">
                      Room Description
                      </label>
                    <textarea 
                    name='description'
                      value={roomData.description}
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
                           PricePerNight
                          </label>
                        <input 
                        type="number"
                        name='pricePerNight'
                        value={roomData.pricePerNight}
                        onChange={handlerchange} 
                        placeholder="0" 
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" 
                        required />
                    </div>
                     </div>
                    <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium"
                     htmlFor="product-description">
                      Room Amenities
                      </label>
                    <textarea 
                      name='amenities'
                      value={roomData.amenities}
                      onChange={handlerchange}
                     rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border
                      border-gray-500/40 resize-none"
                       placeholder="Type here">
                       </textarea>
                </div>

                <div className='w-full flex flex-col gap-1'>
                   <label htmlFor="">Select Hotel</label>
                   <select name="hotel" value={roomData.hotel} 
                   onChange={handlerchange}
                   className='outline-none md:py-2.5 py-2 px-3 
                   rounded border border-gray-500/40'
                   >
                    <option value="">Select Hotel </option>
                    {
                      hotelsData.map((item) => (
                        <option key={item._id} value={item._id}>{item.hotelName}</option>
                      ))
                    }
                   </select>
                </div>

                <div className='flex items-center gap-5 flex-wrap'>
                  <div className='flex-1 flex flex-col gap-1 w-32'>
                  <label className='text-base font-medium'
                   htmlFor="">
                    isAvailable
                    <input 
                    type="checkbox"
                    name='isAvailable'
                    onChange={handlerchange}
                    checked={roomData.isAvailable}
                    placeholder='0'
                    className='outline-none md:py-2.5 py-2 px-3
                     rounded border border-gray-500/40 ml-2'
                     required
                     />
                   </label>
                  </div>
                </div>
                    
               
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded">
                  Add New Room
                  </button>
            </form>
        </div>
   
  )
}

export default AddRoom 

