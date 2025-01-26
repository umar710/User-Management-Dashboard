import axios from "axios";
import { USERS_API } from "./constants";

export const updateUserDetails = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${USERS_API}/${userId}`, updatedData);
    console.log(response);
    console.log(response.data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
