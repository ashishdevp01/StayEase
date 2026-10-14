import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const MostPicked = () => {
    const {hotelData} = useContext(AppContext);
  return (
   
    <div className='py-16'>
        <h1 className='text-heading text-3xl font-semibold text-center mx-auto'>
            Most Picked Hotels
            </h1>
        <p className='text-center text-sm  text-paragraph max-w-lg mx-auto mt-2'>
            Discover our most popular hotels that our guests love!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 max-w-5xl mx-auto">
            
            {hotelData.map((hotel, index) =>(
                <motion.div key={index}
                animate={{ y: [0, -30, 0], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className='relative group rounded-lg overflow-hidden cursor-pointer'
                >
                    <img src={hotel.image.url} alt={hotel.owner.name} 
                    className='size-56 object-cover object-top'
                     />
                   
                     <div className='absolute inset-0 flex flex-col justify-end p-4 text-white
                      bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                         <h1 className='text-lg font-medium'>{hotel.hotelName}</h1>
                         <p className='text-sm'>{hotel.hotelAddress}</p>
                         <h1 className='text-lg font-medium'>${hotel.price.toFixed(2)}</h1>
                     </div>

                </motion.div>
            ))}
        </div>
    </div>
  )
}

export default MostPicked
