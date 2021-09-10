import React, {useState, useEffect} from "react"
import axios from "axios"

const Weather = ({filteredCountries}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const capital = filteredCountries[0].capital
    const [weatherData, setWeatherData] = useState()
  
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeatherData(response.data)
        })
    }, [capital, api_key])
  
    return (
      <>
      {weatherData && filteredCountries.map(country => (
      <div key={country.name}>
        <h3>Weather in {country.capital}</h3>
        <p><b>temperature:</b> {weatherData.main.temp} celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
        <p><b>wind:</b> {weatherData.wind.speed} mph, {weatherData.wind.deg} deg</p>
      </div>
      ))}
      </>
    )
}
export default Weather