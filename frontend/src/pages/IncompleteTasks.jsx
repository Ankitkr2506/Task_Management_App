import React, {useState, useEffect} from 'react'
import Cards from '../Components/Home/Cards'
import axios from 'axios';
const IncompleteTasks = () => {
  const [Data, setData] = useState(); // Initialize as undefined
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-incomplete-tasks", { headers });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default IncompleteTasks