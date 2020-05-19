import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const result = axios.get(baseUrl);
  return result.then((res) => res.data);
};

const updatePerson = (id, updatedPerson) => {
  const result = axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((res) => res.data);
  return result;
};

const postPerson = (newPerson) => {
  const result = axios.post(baseUrl, newPerson);

  return result.then((res) => res.data);
};

const deletePerson = (id) => {
  const result = axios.delete(`${baseUrl}/${id}`);
  return result;
};

export default {
  getAll,
  updatePerson,
  postPerson,
  deletePerson,
};
