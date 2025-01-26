import { useEffect, useState } from "react";
import { USERS_API } from "./constants";
import axios from "axios";

const UserList = () => {
  const [usersData, setUsersData] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(USERS_API);
        setUsersData(response.data);
        // console.log(usersData)
      } catch (error) {
        setErrorMsg(error.message);
        // console.log(error.message)
      }
    };

    fetchData();
  }, []);

  return { usersData, errorMsg, setUsersData };
};

export default UserList;
