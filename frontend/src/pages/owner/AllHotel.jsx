import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { MapIcon, MapPinIcon, Star } from 'lucide-react';
import { tr } from "motion/react-client"
import { toast } from 'react-hot-toast';

import { useEffect } from 'react';
import { useState } from 'react';
const AllHotel = () => {
    const { navigate, axios } = useContext(AppContext)

    const [hotelData, setHotelData] = useState([]);

    const fetchOwnerHotels = async () => {
        try {
            const { data } = await axios.get("/api/hotel/get");
            if (data.success) {
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


    const handleDeleteHotel = async (hotelId) => {
        try {
            const { data } = await axios.delete(`/api/hotel/delete/${hotelId}`);
            if (data.success) {
                toast.success(data.message);
                fetchOwnerHotels(); // Refresh the hotel list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Error deleting hotel.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">

            <div className='max-w-7xl mx-auto'>
                {/* headers */}
                <div className='mb-8 flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-xl p-6'>
                    <div>
                        <h1 className='text-4xl font-bold text-gray-800 mb-2'>Premium Hotels Collections</h1>
                        <p className='text-gray-600'>
                            Discover exceptional stays around the world
                        </p>
                    </div>
                    <button className='bg-primary text-white px-6 py-1 rounded-md cursor-pointer'
                        onClick={() =>
                            navigate("/owner/register-hotel")
                        }>
                        Register Hotel</button>
                </div>

                {/* hotel table   */}

                <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Hotel
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Location
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Hotel  owner
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Contact
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Rating
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Price/Night
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Amenities
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100'>
                                {hotelData.map((hotel, index) => (
                                    <tr key={hotel._id}
                                        className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            }`}
                                    >
                                        <td
                                            className='px-6 py-6'>
                                            <div className='flex items-center space-x-4'>
                                                <div className='relative w-20 h-20 rounded-lg overflow-hidden'>
                                                    <img src={hotel.image.url} alt={hotel.hotelName} className='w-full h-full object-cover' />
                                                    <div className='absolute inset-0 bg-gradient-to-t from-black/22 to-transparent rounded-xl'>

                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className='text-lg font-semibold  text-gray-800 hover:text-blue-600 transition-colors '>
                                                        {hotel.hotelName}</h3>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-6'>
                                            <div className='flex items-start space-x-2'>
                                                <MapIcon className='w-4 h-4 text-gray-400 mt-1 flex-shrink-0' />
                                                <span className='text-gray-600 text-sm leading-relaxed'>{hotel.hotelAddress}

                                                </span>
                                            </div>

                                        </td>
                                        <td className='px-6 py-6'>
                                            <div className='flex items-start space-x-2'>

                                                <span className='text-gray-600 text-sm leading-relaxed'>{hotel.owner.name}</span>
                                            </div>

                                        </td>
                                        <td className='px-6 py-6'>
                                            <div className='flex items-start space-x-2'>
                                                <span className='text-gray-600 text-sm leading-relaxed'>
                                                    +91 1234567890

                                                </span>
                                            </div>

                                        </td>
                                        <td className='px-6 py-6'>
                                            <div className='flex items-start space-x-2'>
                                                <Star className='w-4 h-4 text-yellow-400 fill-current' />
                                                <span className='text-gray-600 text-sm leading-relaxed'>{hotel.rating}</span>
                                            </div>

                                        </td>
                                        <td className='px-6 py-6'>
                                            <span className='text-2xl font-bold text-green-600'>{hotel.price}</span>

                                        </td>
                                        <td className='px-6 py-6'>
                                            <div className='flex flex-wrap gap-1'>
                                                {
                                                    hotel.amenities.map((amenity, index) => (
                                                        <span key={index}
                                                            className='px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full'>
                                                            {amenity}
                                                        </span>
                                                    ))
                                                }
                                            </div>

                                        </td>
                                        <td>
                                            <button
                                                className='bg-red-500 text-white py-1 px-4 rounded-full cursor-pointer'
                                                onClick={() => handleDeleteHotel(hotel._id)}
                                            >
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AllHotel;
