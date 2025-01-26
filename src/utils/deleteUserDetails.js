import axios from "axios";
import { USERS_API } from "./constants";

export const deleteUserDetails = async (userId) => {
  try {
    const response = await axios.delete(`${USERS_API}/${userId}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
