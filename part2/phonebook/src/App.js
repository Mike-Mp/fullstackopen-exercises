import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = (props) => (
  <input onChange={props.handleSearch} value={props.search} />
);

const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <label>Name: </label>{" "}
      <input value={props.newName} onChange={props.handleChange} />
    </div>
    <div>
      <label>Number: </label>
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = (props) => (
  <div>
    {props.toShow.map((person) => (
      <div key={person.name}>
        <p>
          {person.name} {person.number}
        </p>
        <button onClick={() => props.handleDelete(person.id)}>delete</button>
      </div>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  console.log("render", persons.length, "persons");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    let found;
    persons.forEach((person) => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} is already added to phonebook`);
        found = true;
      }
    });

    if (found) {
      return;
    }

    personService.postPerson(newPerson).then((res) => {
      console.log(res);
      setPersons(persons.concat(res));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setNewSearch(e.target.value);
  };

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm(`Do you really want to delete entry?`)) {
      personService.deletePerson(id).then((res) => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const toShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons toShow={toShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
