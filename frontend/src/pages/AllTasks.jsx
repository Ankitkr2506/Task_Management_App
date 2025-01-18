import React, { useState, useEffect } from 'react';
import Cards from '../Components/Home/Cards';
import InputData from '../Components/Home/InputData';
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id:"",
    title:"",
    desc:"",
  });
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers, });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
    
  });
  
  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoIosAddCircle className="text-3xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
       {Data && <Cards home={"true"} setInputDiv={setInputDiv} data = {Data.tasks} setUpdatedData={setUpdatedData}/>}
      </div>
      {/* Pass both InputDiv and setInputDiv as props */}
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData}/>
    </>
  );
};

export default AllTasks;
