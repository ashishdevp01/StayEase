import { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

// import { hotelsData, roomsData } from "../assets/assets";
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL




export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
     const [owner, setOwner] = useState(null);
     const [hotelData, setHotelData] = useState([]);
     const [roomData, setRoomData] = useState([]);

//    const checkAuth = async () => {
//         try {
//             const {data} = await axios.post("/api/user/is-auth");
//             if(data.success) {
//                 setUser(data.user);
//             } 
//          } catch (error) {
//             console.log("error", error);
//             // setUser(null);
//          }
//     }

const checkAuth = async () => {
    try {
        const { data } = await axios.post("/api/user/is-auth");
        if (data.success) {
            setUser(data.user); // or true, depending on your setup
        }
    } catch (error) {
        // If it's a 401, it just means the user isn't logged in. Clear the user state.
        if (error.response && error.response.status === 401) {
            setUser(null);
        } else {
            console.error("Auth check error:", error.message);
        }
    }
};

   const fetchHotelsData = async  () => {
        try {
            const {data} = await axios.get("/api/hotel/get-all");
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
     const fetchRoomsData = async () => {
       try {
            const {data} = await axios.get("/api/room/get-all");
                    
        
            if(data.success) {
                setRoomData(data.rooms);
            }else {
                toast.error(data.message);
            }
        }catch (error) {
            toast.error(error.message || "Error fetching rooms.");
        }
    }
     

     useEffect(() => {
         checkAuth();
        fetchHotelsData();
       fetchRoomsData();
     }, []);

    const value = {
        navigate,
         user,
         setUser, 
         owner,
         setOwner,
          hotelData, 
          roomData,
          axios,
         };

    return (
        <AppContext.Provider value= {value}> {children} </AppContext.Provider>
    )
}

   export default  AppContextProvider;