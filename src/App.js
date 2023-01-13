import { useState, useEffect } from 'react'
import React from "react"
import Persons from './components/Persons'
import Form from './components/Form'
import personService from './services/persons'
import './index.css';

const App = () => {

  const [persons, setPersons] = useState([{ name: '', number: '' }])

  const [filter, setFilter] = useState(null)

  const [filteredPersons, setFilteredPersons] = useState([{ name: '', number: '' }])

  const [data, setNewData] = useState({ name: '', number: '' })

  const [errorMessage, setErrorMessage] = useState(null)

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const getAllPersonsHook = () => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error =>
        setErrorMessage('Error')
      )
  }

  useEffect(getAllPersonsHook, [])

  const handleChange = (event) => {
    setNewData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
    setNewData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    const personObject = {
      name: data.name,
      number: data.number
    }

    const names = persons.map((person) => person.name.toLowerCase())
    const nameToLowerCase = data.name.toLowerCase()

    console.log(personObject.name)

    if (names.includes(nameToLowerCase)) {
      window.confirm(
        `${personObject.name
        } is already in the phonebook, replace number?`
      )
      const previousPerson = persons.find(n => n.name === data.name);
      personService
        .updatePerson(previousPerson.id, { ...previousPerson, number: data.number })
        .then(updatedPerson => {
          setPersons(
            persons.map(n => (n.name === data.name ? updatedPerson : n))
          )
        })
    } if (data.name == "") {
      setErrorMessage("Enter a name and a phonenumber")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } else {
      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilter(null)
          setNewData({ name: '', number: '' })
        })
      setErrorMessage(`${personObject.name} was added to the phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${person.name}?`)

    if (confirmDelete) {
      personService
        .removePerson(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
      setPersons(persons.filter(person => person.id !== id))
    }
    setErrorMessage(`${person.name} was deleted from the phonebook`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <p></p>
      <div className='personFilter'>
        Filter: <input
          className="inputFilter"
          name="filter"
          onChange={handleFilter}/>
      </div>
      <p></p>
      <Form change={handleChange} submit={handleSubmit} />
      <Notification message={errorMessage} />
      <h1>Numbers</h1>
      <p></p>
      <Persons filter={filter} filteredPersons={filteredPersons} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App;