import React from "react"
import Weather from "./Weather"

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
          <Weather filteredCountries={filteredCountries} />
        </div>)) :
        filteredCountries.map(country => 
        <p key={country.name}>{country.name} <button onClick={() => handleClick(country)}>show</button></p>) :
        <p>Too many matches, specify another filter</p>}
        </>
    )
}
export default Countries