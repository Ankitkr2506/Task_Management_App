import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiFootball, BiSolidAlarmOff, BiSolidAlarm, BiSolidAlarmExclamation } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);

  const logout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate('/signup');
  };

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
  }, []);

  const data = [
    {
      title: 'All tasks',
      link: '/',
      icon: <BiFootball />,
    },
    {
      title: 'Important tasks',
      link: '/ImportantTasks',
      icon: <BiSolidAlarmExclamation />,
    },
    {
      title: 'Completed tasks',
      link: '/CompletedTasks',
      icon: <BiSolidAlarmOff />,
    },
    {
      title: 'Incomplete tasks',
      link: '/IncompleteTasks',
      icon: <BiSolidAlarm />,
    },
  ];

  return (
    <>
      {/* Header Section */}
      
       {Data && (
         <div>
         <h2 className="text-xl font-semibold">{Data.username}</h2>
         <h4 className="mb-1 text-gray-400">{Data.email}</h4>
         <hr className="my-2" />
       </div>
       )};
    

      {/* Task List Section */}
      <div className="space-y-1">
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="text-gray-700 flex items-center mb-2 hover:bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {item.icon} &nbsp;
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
