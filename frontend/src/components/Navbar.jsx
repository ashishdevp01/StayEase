
// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets.js";
// import { Link } from "react-router-dom";
// import { AppContext } from "../context/AppContext.jsx";
// import toast from "react-hot-toast";

// const Navbar = () => {
//     const { navigate, user, setUser, axios } = useContext(AppContext);

//     const navLinks = [
//         { name: "Home", path: "/" },
//         { name: "Hotels", path: "/hotels" },
//         { name: "Rooms", path: "/rooms" },
//         { name: "About", path: "/about" },
//     ];

//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isProfileOpen, setIsProfileOpen] = useState(false);

//     const logout = async () => {
//        try {
//         const { data } = await axios.post("/api/user/logout");
//         if (data.success) {
//             toast.success(data.message);
//             setUser(null); // Reset user state properly
//             navigate("/");
//         } else {
//             toast.error(data.message);
//         }
//        } catch (error) {
//         toast.error(error.response?.data?.message || error.message);
//        }
//     };

//     const handleNavClick = () => {
//         setIsMenuOpen(false);
//         setIsProfileOpen(false);
//     };

//     return (
//         <nav
//             className="fixed top-0 left-0 bg-[#FF6347] w-full flex items-center 
//             justify-between px-4 md:px-16 lg:px-24 xl:px-32 
//             transition-all duration-500 z-50 text-white py-4 md:py-6"
//         >
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-2">
//                 <img
//                     src={assets.logo}
//                     alt="logo"
//                     className="h-6.5 w-30"
//                 />
//             </Link>

//             {/* ================= DESKTOP NAV ================= */}
//             <div className="hidden md:flex items-center gap-4 lg:gap-8">
//                 {navLinks.map((link, i) => (
//                     <Link
//                         key={i}
//                         to={link.path}
//                         onClick={handleNavClick}
//                         className="group flex flex-col gap-0.5 text-white"
//                     >
//                         {link.name}
//                         <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300" />
//                     </Link>
//                 ))}
//             </div>

//             {/* ================= DESKTOP RIGHT ================= */}
//             <div className="hidden md:flex items-center gap-4">
//                 {user ? (
//                     <div className="relative inline-block">
//                         {/* Profile Icon */}
//                         <img
//                             src={assets.profile_icon}
//                             alt="profile"
//                             onClick={() => setIsProfileOpen(!isProfileOpen)}
//                             className="w-12 h-12 rounded-full cursor-pointer"
//                         />

//                         {/* Profile Dropdown */}
//                         {isProfileOpen && (
//                             <div
//                                 className="absolute right-0 top-full w-40 
//                                 bg-white shadow-lg rounded-md z-50"
//                             >
//                                 <ul className="py-2">
//                                     {/* My Booking */}
//                                     <li>
//                                         <Link
//                                             to="/my-bookings"
//                                             onClick={() => setIsProfileOpen(false)}
//                                             className="block px-4 py-2 text-sm 
//                                             text-gray-700 hover:bg-gray-100"
//                                         >
//                                             My Booking
//                                         </Link>
//                                     </li>

//                                     {/* Logout */}
//                                     <li>
//                                         <button
//                                             onClick={logout}
//                                             className="block w-full text-left 
//                                             px-4 py-2 text-sm text-gray-700 
//                                             hover:bg-gray-100 cursor-pointer"
//                                         >
//                                             Logout
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <button
//                         onClick={() => navigate("/login")}
//                         className="px-8 py-2.5 rounded-full ml-4 
//                         transition-all duration-500
//                         bg-white text-black cursor-pointer 
//                         hover:bg-primary hover:text-white"
//                     >
//                         Login
//                     </button>
//                 )}
//             </div>

//             {/* ================= MOBILE MENU BUTTON ================= */}
//             <div className="flex items-center gap-3 md:hidden">
//                 <svg
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="h-6 w-6 cursor-pointer"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <line x1="4" y1="6" x2="20" y2="6" />
//                     <line x1="4" y1="12" x2="20" y2="12" />
//                     <line x1="4" y1="18" x2="20" y2="18" />
//                 </svg>
//             </div>

//             {/* ================= MOBILE MENU ================= */}
//             <div
//                 className={`fixed top-0 left-0 w-full h-screen 
//                 text-base flex flex-col md:hidden items-center 
//                 justify-center gap-6 font-medium text-black bg-white 
//                 transition-all duration-500 
//                 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
//             >
//                 {/* Close Button */}
//                 <button
//                     className="absolute top-4 right-4"
//                     onClick={() => {
//                         setIsMenuOpen(false);
//                         setIsProfileOpen(false);
//                     }}
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                     >
//                         <line x1="18" y1="6" x2="6" y2="18" />
//                         <line x1="6" y1="6" x2="18" y2="18" />
//                     </svg>
//                 </button>

//                 {navLinks.map((link, i) => (
//                     <Link
//                         key={i}
//                         to={link.path}
//                         onClick={handleNavClick}
//                         className="text-lg"
//                     >
//                         {link.name}
//                     </Link>
//                 ))}

//                 {user ? (
//                     <button
//                         onClick={() => {
//                             logout();
//                             setIsMenuOpen(false);
//                         }}
//                         className="px-6 py-2 rounded-full bg-red-500 text-white"
//                     >
//                         Logout
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => {
//                             navigate("/login");
//                             setIsMenuOpen(false);
//                         }}
//                         className="px-6 py-2 rounded-full bg-blue-600 text-white"
//                     >
//                         Login
//                     </button>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {

    const { navigate, user, setUser, axios } = useContext(AppContext);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Hotels", path: "/hotels" },
        { name: "Rooms", path: "/rooms" },
        { name: "About", path: "/about" },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // const logout = async () => {
    //    try {
    //     const {data} = await axios.post("/api/user/logout");
    //     if(data.success) {
    //         toast.success(data.message);
    //         setUser(false);
    //         navigate("/");
    //     }else {
    //         toast.error(data.message);
    //     }
    //    } catch (error) {
    //     toast.error(error.response.data.message);
    //    }
    // };


    const logout = async () => {
    try {
        const { data } = await axios.post("/api/user/logout");
        if (data.success) {
            toast.success(data.message);
        }
    } catch (error) {
        // If the server says 401, the session is already gone on the backend
        if (error.response?.status === 401) {
            toast.success("Logged out successfully");
        } else {
            toast.error(error.response?.data?.message || error.message);
        }
    } finally {
        // Always clear client state and redirect home no matter what
        setUser(null); 
        navigate("/");
    }
};
    const handleNavClick = () => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    };

    return (
        <nav
            className="fixed top-0 left-0 bg-[#FF6347] w-full flex items-center 
            justify-between px-4 md:px-16 lg:px-24 xl:px-32 
            transition-all duration-500 z-50 text-white py-4 md:py-6"
        >

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="h-6.5 w-30"
                />
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">

                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        onClick={handleNavClick}
                        className="group flex flex-col gap-0.5 text-white"
                    >
                        {link.name}

                        <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300" />
                    </Link>
                ))}

               
            </div>

            {/* ================= DESKTOP RIGHT ================= */}
            <div className="hidden md:flex items-center gap-4">

                {user ? (

                    <div className="relative inline-block">

                        {/* Profile Icon */}
                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="w-12 h-12 rounded-full cursor-pointer"
                        />

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div
                                className="absolute right-0 top-full w-40 
                                bg-white shadow-lg rounded-md z-50"
                            >
                                <ul className="py-2">

                                    {/* My Booking */}
                                    <li>
                                        <Link
                                            to="/my-bookings"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="block px-4 py-2 text-sm 
                                            text-gray-700 hover:bg-gray-100"
                                        >
                                            My Booking
                                        </Link>
                                    </li>

                                    {/* Logout */}
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left 
                                            px-4 py-2 text-sm text-gray-700 
                                            hover:bg-gray-100 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </li>

                                </ul>
                            </div>
                        )}

                    </div>

                ) : (

                    <button
                        onClick={() => navigate("/login")}
                        className="px-8 py-2.5 rounded-full ml-4 
                        transition-all duration-500
                        bg-white text-black cursor-pointer 
                        hover:bg-primary hover:text-white"
                    >
                        Login
                    </button>

                )}

            </div>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <div className="flex items-center gap-3 md:hidden">

                <svg
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>

            </div>

            {/* ================= MOBILE MENU ================= */}
            <div
                className={`fixed top-0 left-0 w-full h-screen 
                text-base flex flex-col md:hidden items-center 
                justify-center gap-6 font-medium text-black bg-white 
                transition-all duration-500 
                ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4"
                    onClick={() => {
                        setIsMenuOpen(false);
                        setIsProfileOpen(false);
                    }}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Mobile Nav Links */}
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        onClick={handleNavClick}
                    >
                        {link.name}
                    </Link>
                ))}

               

                {/* ================= MOBILE PROFILE ================= */}
                {user ? (

                    <div className="relative inline-block">

                        {/* Profile Icon */}
                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="w-12 h-12 rounded-full cursor-pointer"
                        />

                        {/* Mobile Dropdown */}
                        {isProfileOpen && (
                            <div
                                className="absolute left-1/2 -translate-x-1/2 
                                top-full mt-2 w-40 bg-white shadow-lg 
                                rounded-md z-50"
                            >
                                <ul className="py-2">

                                    {/* My Booking */}
                                    <li>
                                        <Link
                                            to="/my-bookings"
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                setIsMenuOpen(false);
                                            }}
                                            className="block px-4 py-2 text-sm 
                                            text-gray-700 hover:bg-gray-100"
                                        >
                                            My Booking
                                        </Link>
                                    </li>

                                    {/* Logout */}
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left 
                                            px-4 py-2 text-sm text-gray-700 
                                            hover:bg-gray-100 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </li>

                                </ul>
                            </div>
                        )}

                    </div>

                ) : (

                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            navigate("/login");
                        }}
                        className="px-8 py-2.5 rounded-full ml-4 
                        transition-all duration-500
                        bg-primary text-black cursor-pointer 
                        hover:bg-primary hover:text-white"
                    >
                        Login
                    </button>

                )}

            </div>
        </nav>
    );
};

export default Navbar;