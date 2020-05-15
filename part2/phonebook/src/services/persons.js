import axios from "axios";

const getAll = () => {
  const result = axios.get("http://localhost:3001/persons");
  return result.then((res) => res.data);
};

const update = (id, updatedPerson) => {
  const result = axios
    .put(`http://localhost:3001/persons/${id}`, updatedPerson)
    .then((res) => res.data);
  return result;
};

const postPerson = (newPerson) => {
  const result = axios.post("http://localhost:3001/persons", newPerson);

  return result.then((res) => res.data);
};

const deletePerson = (id) => {
  const result = axios.delete(`http://localhost:3001/persons/${id}`);
  return result;
};

export default {
  getAll,
  update,
  postPerson,
  deletePerson,
};
