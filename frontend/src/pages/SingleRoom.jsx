import React, {useState} from 'react'

import toast from "react-hot-toast"
import { Navigate, useParams } from 'react-router-dom'
import { useContext} from 'react'
import { AppContext } from '../context/AppContext'
import { Bath,Mountain, Building, Eye, TreePine, Coffee,Utensils, Wifi,
Tv, User, Car, Droplet,Wind,Phone,MapPin, XCircle, CheckCircle, Calendar,Star,Users
 } from 'lucide-react'

const SingleRoom = () => {

  const {roomData, axios, navigate} = useContext(AppContext);
 const {id} = useParams();

const room = roomData.find((room) => room._id ==id);
const [selectedImage,setSelectedImage] = useState(0);
const [bookingData, setBookingData]  = useState({
    checkIn: "",
    checkOut: "",
    persons: 1,
});

const [isAvailable, setIsAvailable] = useState(false);

const onChangeHandler = (e) => {
  setBookingData({ ...bookingData, [e.target.name]: e.target.value})
} 
 
if (!room) {
  return <div>Loading...</div>;
}

  const getAmenityIcon = (amenity) =>{
  const iconMap= {
    "ocean View": Eye,
    "Mountain View": Mountain,
    "city View": Building,
    "Garden View": TreePine,
    "Balcony": Building,
    "Mini Bar": Coffee,
    "Room Service": Utensils,
    "Free Wi-Fi": Wifi,
    "Premium Wi-Fi": Wifi,
    "Work Desk": Building,
    "Concierage Service": User,
    "Breakfast Included": Coffee,
    "Parking": Car,
    "Swimming Pool": Droplet,
    "Smart TV": Tv,
    "Spa Access": Bath,
    "Pool Access": Bath,
    "Kitchenette": Utensils,
    "Living Area": Building,
    "Private Terrace": Building,
    "Butler Service": User,
    "jacuzzi": Bath,
    "Panoamic View": Eye,
  };


   return iconMap[amenity] || CheckCircle;
 
  }

  
const checkRoomAvailability = async () => {
    try {
        if (!bookingData.checkIn || !bookingData.checkOut) {
            toast.error("Please select both dates");
            return;
        }

        if (bookingData.checkIn >= bookingData.checkOut) {
            toast.error("Check-in date should be before check-out date");
            setIsAvailable(false);
            return;
        }

        const { data } = await axios.post(
            "/api/bookings/check-availability",
            {
                room: room._id,
                checkInDate: bookingData.checkIn,
                checkOutDate: bookingData.checkOut,
            }
        );

        if (data.success && data.isAvailable) {
            setIsAvailable(true);
            toast.success("Room is available");
        } else {
            setIsAvailable(false);
            toast.error(
                data.message || "Room is not available"
            );
        }
    } catch (error) {
        setIsAvailable(false);
        toast.error(
            error.response?.data?.message || error.message
        );
    }
};


  const onSubmitHandler = async (e) => {
       e.preventDefault();
       try {

        if(!isAvailable) {
         return checkRoomAvailability();
           toast.error("Room is not available");
        } else {
          const {data} = await axios.post("/api/bookings/book", {
             room: room._id,
             checkInDate: bookingData.checkIn,
             checkOutDate: bookingData.checkOut,
             persons: bookingData.persons,
             paymentMethod: "Pay At Hotel",
          });
          if(data.success) {
            toast.success(data.message);
          navigate("/my-bookings");
            scrollTo(0, 0);
          } else {
            toast.error(data.message);
          }
        }

       } catch (error) {
        toast.error(error.message);
       }
  }
  
  return (
    <div className='py-23 min-h-screen bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <div className=' bg-white rounded-2xl shadow-lg p-5 mb-5'>
             
             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-0">
                   <div className='flex-1'>
                      <h1 className='text-4xl font-bold  text-gray-800'>
                        {room.roomType} 
                      </h1>
                      <div className='flex items-center gap-2 text-gray-600 mb-3 mt-3'>
                        <MapPin className='w-5 h-5' />
                        <span>{room.hotel.hotelAddress}</span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-1 '>
                              <Star className='w-5 h-5 text-yellow-500 fill-current' />
                              <span>{room.hotel.rating}</span>

                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium 
                              ${room.isAvailable
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                              }`}
                              >
                              {room.isAvailable ? (
                                <>
                                <CheckCircle className='w-4 h-4' />
                                <span>Available</span>
                                </>
                              ) : (
                                <>
                                <XCircle className='w-4 h-4' />
                                <span>Not Available</span>
                                </>
                              )}
                            </div>
                        </div>
                   </div>

                   <div className='text-right'>
                    <div className='text-3xl font-bold text-green-600 mb-2'>
                          ${room.pricePerNight} <span>/night</span>
                    </div>
               
                 <div className='text-gray-600'>
                   <div className='flex items-center gap-2'>
                    <User className='w-4 h-4' />
                     <span>{room.hotel.owner.name}</span>
                   </div>
                   <div className='flex items-center gap-2 mt-1'>
                    <Phone className='w-4 h-4' />
                     <span>-8579463686</span>
                   </div>
                 </div>
                 
                   </div>
             </div>
          </div>

          {/* image gallery */}
          <div className='bg-white rounded-2xl shadow-lg p-8 mb-8'>
               <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Room Gallery
                </h2>
                <div className='grid lg:grid-cols-3 gap-6'>
                  <div className='lg:col-span-2'>
                    <img 
                     src={room.images[selectedImage]?.url}
                     alt={`${room.roomType} - Image ${selectedImage + 1}`}
                     className='w-full h-96 object-cover rounded-xl' />
                  </div>
                  <div className='grid grid-cols-2 lg:grid-cols-1 gap-4'>
                     {
                      room.images.map((image, index) => (
                        <img key={index} src={image?.url} alt={`Thumbnail ${index + 1}`}
                          className={`h-24 lg:h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 
                            ${selectedImage === index
                              ?"ring-4 ring-blue-500 opacity-100"
                              :"opacity-80 hover:opacity-110"
                            }`}
                            onClick={() => setSelectedImage(index)}/>
                      ))
                     }
                  </div>
                 

                </div>
          </div>
       {/* room details */}

        <div className='grid lg:grid-cols-3 gap-8'>
             <div className='lg:col-span-2 space-y-8'>
              <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>
              About This Room
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              {room.description}
              </p>
            </div>
            {/* room Amenities */}

            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Room Amenities
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                 {
                  room.amenities.map((amenity, index) =>{
                  const IconComponent = getAmenityIcon (amenity);
                  return (
                    <div key={index} className='flex items-center gap-3 p-3 bg-blue-50 rounded-lg'>
                    < IconComponent  className="w-5 h-5 text-blue-600"/>
                    <span className='text-gray-700 font-medium'>
                       {amenity}
                    </span>
                    </div>
                  )
                  })}
                </div>
             </div>
               {/* hotel amenities */}
             <div className='bg-white rounded-2xl shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Hotel Amenities
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                 {
                  room.hotel.amenities.map((amenity, index) =>{
                  const IconComponent = getAmenityIcon (amenity);
                  return (
                    <div key={index} className='flex items-center gap-3 p-3 bg-blue-50 rounded-lg'>
                    < IconComponent  className="w-5 h-5 text-blue-600"/>
                    <span className='text-gray-700 font-medium'>
                       {amenity}
                    </span>
                    </div>
                  )
                  })}
                </div>
             </div>
             </div>

             {/* booking form */}

             <div
             className=' lg:col-span-1 '>
              <div className='bg-white rounded-2xl shadow-lg p-8 sticky top-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                  Book This Room
                </h2>
                <form onSubmit={onSubmitHandler} className="space-y-4">
                     <div>
                       <label htmlFor=""          
                       className='block text-sm font-medium text-gray-700 mb-2'>
                        <Calendar className="w-4 h-4 inline mr-2" />
                        check-in Date
                       </label>
                       <input type="date"
                       name="checkIn"
                       min={new Date().toISOString().split("T") [0]} 
                       value={bookingData.checkIn}
                       onChange={onChangeHandler} 
                       className='w-full px-4 py-3 border border-gray-300 
                       rounded-lgfocus:ring-2 focus:ring-blue-500 focus:border-transparent'
                       />
                     </div>
                     <div>
                       <label htmlFor="" 
                       className='block text-sm font-medium text-gray-700 mb-2'>
                        <Calendar className="w-4 h-4 inline mr-2" />
                        check-out Date
                       </label>
                       <input type="date"
                       name='checkOut' 
                       value={bookingData.checkOut}
                       min={bookingData.checkIn}
                       onChange={onChangeHandler} 
                       className='w-full px-4 py-3 border border-gray-300 
                       rounded-lgfocus:ring-2 focus:ring-blue-500 focus:border-transparent'
                       />
                     </div>
                     <div>
                       <label htmlFor="" 
                       className='block text-sm font-medium text-gray-700 mb-2'>
                        <User className="w-4 h-4 inline mr-2" />
                        Number of Guest
                       </label>
                       <input type="number"
                       name='persons' 
                       value={bookingData.persons}
                       onChange={onChangeHandler} 
                       className='w-full px-4 py-3 border border-gray-300 
                       rounded-lgfocus:ring-2 focus:ring-blue-500 focus:border-transparent'
                       />
                     </div>
                     <div className='border-t pt-4 mt-6'>
                      <div className='flex justify-between items-center mb-4'>
                        <span className='text-gray-600'>Priceper night</span>
                           <span className='font-bold text-xl '>
                            ${room.pricePerNight}
                           </span>
                      </div>

                     </div>
                     <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                               bg-blue-600 hover:bg-blue-700 text-white 
                            `}
                              
                      type='submit'  >
                      {isAvailable?"Book Now" : "Check Availability"}
                     </button>
                </form>

              </div>
             </div>
        </div>
        </div>
    </div>
  )
}

export default SingleRoom
