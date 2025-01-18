import React, { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, setUpdatedData}) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleImportant = async (id) => {
    try {
    const response= await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`, {}, { headers });
    console.log(response);
    } catch (error) {
      console.log('Error completing task:', error);
    }
  };
  const handleCompleteTask = async (id) => {
    try {
     await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`, {}, { headers });
    
    } catch (error) {
      console.log('Error completing task:', error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, { headers });
      console.log(response.data.message);
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };
  const handleUpdate = (id,title,desc)=>{
    setInputDiv("fixed");
    setUpdatedData({id:id, title:title, desc:desc});
  }
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data && data.map((item) => (
        <div key={item._id} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-300 my-2">{item.desc}</p>
          </div>
          <div className="mt-4 w-full flex items-center">
            <button 
              className={`${
                item.complete === false ? "bg-red-400" : "bg-green-700"
              } p-2 rounded w-3/6`}
              onClick={() => handleCompleteTask(item._id)}
            >
              {item.complete === true ? "Completed" : "Incompleted"}
            </button>

            <div className="text-white p-2 w-3/6 text-2xl flex justify-around">
              <button onClick={()=>handleImportant(item._id)}>
                {item.important === false ? <CiHeart /> :  <FaHeart className="text-red-500"/>}
                </button>
              {home !== "false" && 
              <button onClick={()=>handleUpdate(item._id, item.title, item.desc)}>
                <FaEdit /></button>}
              <button onClick={()=> deleteTask(item._id)}>
                <MdDelete /></button>
            </div>
          </div>
        </div>
      ))}
      
      {home === "true" && (
        <button 
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoIosAddCircle className="text-6xl"/>
          <h2 className="text-2xl m-4">Add Tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
