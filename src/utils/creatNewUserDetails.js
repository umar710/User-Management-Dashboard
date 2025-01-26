import axios from "axios";
import { USERS_API } from "./constants";

export const creatNewUserDetails = async (newUserData) => {
  try {
    const response = await axios.post(USERS_API, newUserData);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
