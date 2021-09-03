import React, { useState } from "react"
import Note from "./Note"

const App = () => {
  const [ persons, setPersons] = useState([{
    name: "Arto Hellas"
  }]) 
  const [ newName, setNewName ] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    let nameList = persons.map(person => person.name)
    const personObject = {
      name: newName
    }
    if (nameList.includes(personObject.name)){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
          <Note key={person.name} person={person} />
        )}
    </div>
  )
}

export default App