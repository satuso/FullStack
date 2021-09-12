import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
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

  const handleSubmit = (event) => {
    event.preventDefault()
    let nameList = persons.map(person => person.name)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (nameList.includes(personObject.name)){
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName(newName)
        setNewNumber(newNumber)
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
  const handleDelete = () => {
    console.log("delete")
  }

  let filteredPersons = (filter === "" ? persons : persons.filter(function(person){
    return person.name.toLowerCase().includes(filter.toLowerCase())
  }))

  return (
    <div>
      <h1>Phonebook</h1>
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