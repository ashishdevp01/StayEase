import React, {useContext, useState} from 'react'
import {Mail,Lock} from "lucide-react"
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import toast from "react-hot-toast"
const Login = () => {
  const {setUser, navigate, setOwner, axios} = useContext(AppContext);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    role: "",
  });

  const onChangehandler = (e)=>{
    setFormdata({...formdata,[e.target.name]: e.target.value})
  }

  const submithandler = async (e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/user/login", formdata);
     
      if(data.success) {
       toast.success(data.message);
        setUser(data.user);

       if(data.user.role === "owner") {
         setOwner(true);
        navigate("/owner");

       } else {
        setUser(true);
        navigate("/");
       }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
        <form onSubmit={submithandler} className= "max-w-96 w-full mx-auto mt-36 text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
    <h1 className= "text-heading text-3xl mt-10 font-medium">Login</h1>
    <p className= "text-paragraph text-sm mt-2">
      Please Login to continue</p>
    <div className= "flex items-center w-full mt-8 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
     <div className= "flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
   

    <button type="submit" 
    className= "mt-7 w-full h-11 rounded-full text-white bg-primary cursor-pointer">
        Login
    </button>
    <p className= "text-gray-500 text-sm mt-3 mb-11">
      Don’t have an account? 
      <Link to={'/signup'} className= "text-primary">Sign up
      </Link>
      </p>
</form>
    </div>
  )
}

export default Login

