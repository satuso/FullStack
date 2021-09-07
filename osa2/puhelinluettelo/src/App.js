import React, { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      setPersons(persons.concat(personObject))
      setNewName(newName)
      setNewNumber(newNumber)
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
          <Persons key={person.name} person={person} />
        )}
        </div>
    </div>
  )
}

export default App