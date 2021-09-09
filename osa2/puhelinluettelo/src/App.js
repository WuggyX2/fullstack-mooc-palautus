import React, { useState, useEffect } from "react";
import PersonsList from "./components/PersonsList";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterTerm, setFilterTerm] = useState("");

    const effectHook = () => {
        personService
            .getPersons()
            .then((personData) => {
                setPersons(personData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(effectHook, []);

    const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filterTerm.toLowerCase()));

    const handleOnClick = (event) => {
        event.preventDefault();

        if (!persons.some((person) => person.name === newName)) {
            const newPerson = {
                name: newName,
                number: newNumber,
            };
            personService
                .createPerson(newPerson)
                .then((response) => {
                    setPersons(persons.concat(response));
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            const confirmResult = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            );

            if (confirmResult) {
                const existingPerson = persons.find((person) => person.name === newName);
                const changedPerson = { ...existingPerson, number: newNumber };

                personService.updatePerson(changedPerson).then((response) => {
                    setPersons(persons.map((person) => (person.id !== changedPerson.id ? person : changedPerson)));
                });
            }
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

    const handleDeleteClick = (event) => {
        const numberId = parseInt(event.target.dataset.id);
        const confirmResponse = window.confirm(`Delete ${event.target.dataset.name}?`);
        if (confirmResponse) {
            personService
                .deletePerson(numberId)
                .then(() => {
                    const updatedPersonArray = persons.filter((person) => {
                        return person.id !== numberId;
                    });
                    console.log(updatedPersonArray);
                    setPersons(updatedPersonArray);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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
            <PersonsList persons={personsToShow} onDeleteClick={handleDeleteClick} />
        </div>
    );
};

export default App;
