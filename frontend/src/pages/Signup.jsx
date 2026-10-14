import React, { useState, useContext } from 'react'
import { Mail, Lock, User } from "lucide-react"
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Signup = () => {
  const { axios, navigate } = useContext(AppContext);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const onChangehandler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/signup", formdata);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      // Safely extract error message with fallback optional chaining
      const errorMessage = error.response?.data?.message || error.message || "Network Error";
      toast.error(errorMessage);
    }
  }

  return (
    <div>
      <form onSubmit={submithandler} className="max-w-96 w-full mx-auto mt-36 text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-heading text-3xl mt-10 font-medium">Signup</h1>
        <p className="text-paragraph text-sm mt-2">Please sign up to continue</p>

        <div className="flex items-center w-full mt-8 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <User className='w-4 h-4' />
          <input 
            type="text"
            name="name"
            autoComplete="username"
            value={formdata.name}
            onChange={onChangehandler}
            placeholder="username" 
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
          /> 
        </div> 

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail className='w-4 h-4' />
          <input 
            type="email"
            name="email"
            autoComplete="username"
            value={formdata.email}
            onChange={onChangehandler}
            placeholder="Email id" 
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
          /> 
        </div> 

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <select
            name="role" 
            onChange={onChangehandler} 
            value={formdata.role}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
          >
            <option value="">Select your role</option>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
        </div> 

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock className='w-4 h-4'/> 
          <input 
            type="password"
            name="password"
            autoComplete="current-password"
            value={formdata.password}
            onChange={onChangehandler}
            placeholder="Password" 
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required
          />             
        </div>

        <button type="submit" className="mt-7 w-full h-11 rounded-full text-white bg-primary cursor-pointer">
          Signup
        </button>
        
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Already have an account? 
          <Link to={'/login'} className="text-primary"> Login Here</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup;


