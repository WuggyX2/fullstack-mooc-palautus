import React, { useState } from "react";
import PersonsList from "./components/PersonsList";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  );
  const handleOnClick = (event) => {
    event.preventDefault();

    if (!persons.some((person) => person.name === newName)) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnChangeFilter = (event) => {
    setFilterTerm(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} onChange={handleOnChangeFilter} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onChangeName={handleOnChangeName}
        onChangeNumber={handleOnChangeNumber}
        onClickAdd={handleOnClick}
      />
      <PersonsList persons={personsToShow} />
    </div>
  );
};

export default App;
