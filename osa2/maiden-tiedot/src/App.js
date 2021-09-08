import React, {useState, useEffect} from "react"
import axios from "axios"

const Country = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((country) => <li key={country.name}>{country.name}</li>)}
      </ul>
      <img style={{ width: 100 }} src={country.flag} alt={country.name}/>
    </>
  )
}

const Filter = ({filteredCountries}) => {
  return (
    <>
      {
      filteredCountries.length <= 10 ?
      filteredCountries.length === 1 ?
      filteredCountries.map(country => 
      (<Country key={country.name} country={country}/>)) :
      filteredCountries.map(country => <p key={country.name}>{country.name}</p>) :
      <p>Too many matches, specify another filter</p>
      }
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

  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
    Find countries: 
      <input type="text" onKeyDown={handleSubmit} onChange={handleChange}></input>
      <Filter key={filteredCountries.name} filteredCountries={filteredCountries}/>
    </div>
    )
  }

export default App