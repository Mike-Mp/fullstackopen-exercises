import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

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

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const update = (id, changedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObject);
  return request.then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
};
