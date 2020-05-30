import axios from "axios";

const loginUser = async (credentials) => {
  const response = await axios.post("/api/login", credentials);
  return response.data;
};

export default { loginUser };
