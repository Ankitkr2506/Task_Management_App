import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";//to connect to backend
const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/");
  }
  const [Data, setData] = useState({username:"",email:"",password:""});
  
  const change = (e) => {
    const {name, value} = e.target;
    setData({ ...Data, [name]: value});
  };
  const submit = async() => {
    try {
      if(Data.username === "" || Data.email === "" || Data.password === "")
        {
          alert("All fields are required")
        }else{
         const response = await axios.post("http://localhost:1000/api/v1/sign-in", Data);
         setData({username:"",email:"",password:""});
         console.log(response);
         history("/login");
        }
    } catch (error) {
      alert(error.response.data.message);
    }
   
  };
  return (
    <div className="bg-red-600 h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold text-center mb-4">Signup</div>
        <input 
          type="username"
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input 
          type="email"
          placeholder="Email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          required
          value={Data.email}
          onChange={change}
        />
        <input 
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex items-center justify-between mt-4">
          <button className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded" onClick={submit}>
            Signup
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account? 
            <Link to="/login" className="text-blue-500 hover:text-blue-400 ml-1">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
