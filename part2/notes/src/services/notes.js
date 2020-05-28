import axios from "axios";
const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This is not saved to server",
    date: "2019-05-30T17L30L31.098Z",
    important: true,
  };
  return request.then((res) => res.data.concat(nonExisting));
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, changedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObject);
  return request.then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
  setToken,
};
