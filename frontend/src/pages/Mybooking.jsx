import React, { useContext, useEffect, useState } from 'react';
import {
  MapPin,
  Calendar,
  User,
  Clock,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from '../context/AppContext.jsx';

const Mybooking = () => {
  const { axios, navigate } = useContext(AppContext);
  const [bookingData, setBookingData] = useState([]);

  const fetchMyBookings = async () => {
      try {
        const { data } = await axios.get("/api/bookings/user");
        if (data.success) {
          setBookingData(data.bookings);
        } else {
          toast.error(data.message || "Failed to fetch bookings");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Please login to view your bookings");
          navigate("/login");
        } else {
          toast.error(error.response?.data?.message || error.message);
        }
      }
  };

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axios.post("/api/bookings/stripe-payment", {
         bookingId,
      });
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Payment initiation failed");
      }
    } catch (error) {
       toast.error(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
         return "bg-green-500";
      case "pending":
         return "bg-yellow-500";
      case "cancelled":
         return "bg-red-500";
      default:
         return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "confirmed":
         return "text-green-500";
      case "pending":
         return "text-yellow-500";
      case "cancelled":
         return "text-red-500";
      default:
         return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
      switch (status) {
        case "confirmed":
          return CheckCircle;
        case "pending":
          return Clock;
        case "cancelled":
          return XCircle;
        default:
          return Clock;
      }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-32'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>My Bookings</h1>
          <p className='text-gray-600 text-lg'>
            Here are your hotel bookings. You can view details and manage your reservations.
          </p>
        </div> 

        {/* Booking List */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
          {/* Desktop Header */}
          <div className='hidden md:grid md:grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200 font-semibold text-gray-700'>
             <div className='col-span-4'>Hotel & Room</div>
             <div className='col-span-3'>Dates</div>
             <div className='col-span-3'>Payment</div>
             <div className='col-span-2'>Status</div>
          </div>     

          <div className='divide-y divide-gray-100'>
            {bookingData.map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
               <div key={booking._id} className='p-6 hover:bg-gray-50 transition-colors'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center'>
                  
                  {/* Hotel & Room Information */}
                  <div className='col-span-1 md:col-span-4'>
                   <div className='flex gap-4'>
                    <img 
                      src={booking.room?.images?.[0]?.url}
                      alt={booking.room?.roomType || "Room"}
                      className="w-20 h-16 md:w-24 md:h-20 rounded-lg object-cover flex-shrink-0" 
                    />
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-gray-800 text-lg mb-1'>
                       {booking.hotel?.hotelName}
                      </h3>
                      <p className='text-blue-600 font-medium mb-1'>
                       {booking.room?.roomType}
                      </p>
                      <div className='flex items-center gap-1 text-gray-500 text-sm mb-1'>
                        <MapPin className='w-3 h-3 flex-shrink-0' />
                        <span className="truncate">{booking.hotel?.hotelAddress}</span>
                      </div>
                      <div className='flex items-center gap-1 text-gray-500 text-sm'>
                        <User className="w-3 h-3 flex-shrink-0" />
                        <span>
                         {booking.persons} Guest{booking.persons > 1 ? "s" : ""}
                        </span>
                      </div>
                   </div>
                  </div>
                 </div>

                 {/* Dates */}
                 <div className='col-span-1 md:col-span-3'>
                     <div className='space-y-2'>
                       <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-500'>Check-in</p>
                          <p className='font-medium text-gray-800'>
                            {new Date(booking.checkIn).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                       </div>

                       <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-500'>Check-out</p>
                          <p className='font-medium text-gray-800'>
                            {new Date(booking.checkOut).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                       </div>
                     </div>
                 </div>

                 {/* Payments */}
                 <div className='col-span-1 md:col-span-3'>
                    <div className='space-y-2'>
                      <p className='font-bold text-lg text-gray-800'>
                        ${booking.totalPrice}
                      </p>
                      <div>
                        <button 
                          className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium ${
                            booking.isPaid 
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700 hover:opacity-80"
                          }`} 
                          onClick={() => !booking.isPaid && handlePayment(booking._id)}
                          disabled={booking.isPaid}
                        >
                          {booking.isPaid ? "Paid" : "Pay Now"}
                        </button>
                      </div>
                    </div>
                 </div>

                 {/* Status */}
                 <div className='col-span-1 md:col-span-2'>
                   <div className='flex items-center gap-2'>
                     <div className={`w-3 h-3 rounded-full ${getStatusColor(booking.status)}`}></div>
                     <StatusIcon className={`w-4 h-4 ${getStatusTextColor(booking.status)}`} />
                     <span className={`font-medium capitalize ${getStatusTextColor(booking.status)}`}>
                       {booking.status}
                     </span>
                   </div>
                 </div>

                </div>
               </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mybooking;