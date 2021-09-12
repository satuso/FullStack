import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

const App = () => {
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState("")
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ msg, setMsg ] = useState(null)

  const filteredPersons = (filter === "" ? persons : persons.filter(function(person){
    return person.name.toLowerCase().includes(filter.toLowerCase())
  }))
 
  const handleSubmit = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const updatedPerson = {...person, number: newNumber}
    const nameList = persons.map(person => person.name)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (nameList.includes(personObject.name)){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ?
      personService
      .update(person.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setMsg(`${newName}'s number was updated`)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      }) : setPersons(filteredPersons)
    } else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName(newName)
        setNewNumber(newNumber)
        setMsg(`Added ${newName}`)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      })
    }
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleDelete = (id, name) => {
    window.confirm(`Delete ${name}?`) ?
    personService
      .deletePerson(id)
      .then(() => {
      const newPersons = persons.filter((item) => item.id !== id)
      setPersons(newPersons)
      setMsg(`Deleted ${newName}`)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
      })
      : setPersons(filteredPersons)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={msg}/>
      <Filter handleFilterChange={handleFilterChange}/>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <div>
        {filteredPersons.map(person =>
          <Persons key={person.name} person={person} handleDelete={handleDelete}/>
        )}
        </div>
    </div>
  )
}

export default App