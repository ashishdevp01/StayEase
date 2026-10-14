

// export default Loader
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Loader = () => {
  const navigate = useNavigate(); 
  const { nextUrl } = useParams(); 

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 3000); 
      
      return () => clearTimeout(timer);
    }
  }, [nextUrl, navigate]);

  return (
    <div className='flex items-center justify-center h-screen w-full'>
 
       <div className='animate-spin rounded-full w-24 h-24 border-4 border-gray-300 border-t-primary'></div>
    </div>
  );
};

export default Loader;
