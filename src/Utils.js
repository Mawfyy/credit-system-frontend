import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetcher = async (...args) => {
  const { data } = await axios.get(...args);
  return data;
}


