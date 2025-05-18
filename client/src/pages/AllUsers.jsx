import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";
import { CLIENT_URL } from "../utils/Data.js"

import axios from "axios";
import { useAuthStore } from "../store/authStore";


axios.defaults.withCredentials = true;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const {user : currentUser} = useAuthStore();

  const fetchData = async () => {
    try {
      const response = (await axios.get(`${CLIENT_URL}/api/user/allUser`)).data;
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-35 w-full bg-transparent text-white">
        <h1 className="text-3xl font-bold mb-8 text-white">All Users</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {users?.map(
            (item, index) =>
              item._id !== currentUser._id && (
                <UserCard key={item.id || index} data={item} />
              )
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default AllUsers;
