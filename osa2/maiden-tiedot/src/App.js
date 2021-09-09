import React, {useState, useEffect} from "react"
import axios from "axios"

const Countries = ({filteredCountries, handleClick}) => {
  return (
    <>
      {filteredCountries.length <= 10 ?
      filteredCountries.length === 1 ?
      filteredCountries.map(country => 
      (<div key={country.name}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((country) => <li key={country.name}>{country.name}</li>)}
        </ul>
        <img style={{ width: 100 }} src={country.flag} alt={country.name}/>
      </div>)) :
      filteredCountries.map(country => 
      <p key={country.name}>{country.name} <button onClick={() => handleClick(country)}>show</button></p>) :
      <p>Too many matches, specify another filter</p>}
    </>
  )
}

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
    console.log("click")
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