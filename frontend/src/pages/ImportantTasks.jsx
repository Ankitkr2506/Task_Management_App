import React, { useEffect, useState } from 'react';
import Cards from '../Components/Home/Cards';
import axios from 'axios';

const ImportantTasks = () => {
  const [Data, setData] = useState(); // Initialize as undefined
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-imp-tasks", { headers });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetch();
  }, []); // Added [] to avoid infinite re-fetching

  return (
    <div>
      {/* Ensure Data is an array or fallback to an empty array */}
      <Cards home={"false"} data={Data || []} />
    </div>
  );
};

export default ImportantTasks;
