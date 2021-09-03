import React, { useState } from "react"
import Note from "./Note"

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
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
      setNewName("")
      setNewNumber("")
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
      <div>
        filter list:
        <input
          value={filter}
          onChange={handleFilterChange} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input 
            value={newName} 
            onChange={handleNameChange}
          />
          number:
          <input 
            value={newNumber} 
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div className="results">
        {filteredPersons.map(person =>
          <Note key={person.name} person={person} />
        )}
        </div>
    </div>
  )
}

export default App