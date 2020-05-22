import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let found;
    let numberExist;
    let personID;

    persons.forEach((person) => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} is already added to phonebook`);
        if (person.number !== newPerson.number) {
          found = true;
          numberExist = true;
          personID = person.id;
          return;
        }
        found = true;
      }
    });

    if (found && numberExist) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(personID, newPerson)
          .then((res) => personService.getAll().then((res) => setPersons(res)));
      }
      return;
    }

    if (found) {
      setErrorMessage(`${newPerson.name} already exists.`);
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    personService
      .postPerson(newPerson)
      .then((res) => {
        console.log(res);
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
        setErrorMessage(`${newPerson.name} was added to phonebook.`);
        setTimeout(() => setErrorMessage(null), 5000);
      })
      .catch((error) => {
        setNewName("");
        setNewNumber("");
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 6000);
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
    let deletedPerson = persons.filter((p) => p.id === id);
    console.log(deletedPerson);
    if (window.confirm(`Do you really want to delete entry?`)) {
      personService
        .deletePerson(id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => {
          setErrorMessage(`${deletedPerson} was already deleted from server`);
          setTimeout(() => setErrorMessage(null), 5000);
        });
      setErrorMessage(`${deletedPerson[0].name} was deleted from the server.`);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const toShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
