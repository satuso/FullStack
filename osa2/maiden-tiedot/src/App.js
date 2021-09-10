import React, {useState, useEffect} from "react"
import axios from "axios"
import Countries from "./components/Countries"

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    setFilter(country.name)
  }

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
    Find countries: 
      <input type="text" onChange={handleChange}></input>
      <Countries key={filteredCountries.name} filteredCountries={filteredCountries} handleClick={handleClick}/>
    </div>
    )
  }

export default App