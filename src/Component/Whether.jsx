import React, { useState, useEffect } from 'react'
import "./Whether.css"
// import search from './assets/search.png'
import clear from './assets/clear.png'
import cloud from './assets/cloud.png'
import wind from './assets/wind.png'


const Whether = () => {
  const [city, setCity] = useState("pune")
  const [weatherData, setWeatherData] = useState(null)
  const [loading,setLoading] = useState(true)

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formatData = `${day}-${month}-${year}`

  const API_KEY = "41af45b9746ab6e3975fb64f4a22d4f9"
  const fetchApiData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      const data = await response.json()
      console.log(data);
      if(data.cod !== 200){
        throw new Error("City not found")
      }

     
      setWeatherData(data)
    } catch (error) {
      console.log(error);

    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchApiData()
  }, [])

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchApiData();

  }

  const getWeatherIconUrl =(main)=>{
        switch(main) {
          case "Clear":
            return clear;
          case "Smoke":
            return cloud;
          case "Mist":
            return wind;
          case "Haze":
            return  clear 
            default:
              return clear;
        }
  }
 


  return (
    <div className='App'>
      <div className='container'>
       {weatherData && (
        <>
         <h1 className="container-date">{formatData}</h1>
            <div className="whether-data">
              <h2 className='container-city'>{weatherData.name}</h2>
              
              
              <img className='container-img' 
              src={getWeatherIconUrl(weatherData?.weather[0]?.main) || clear} 
              width="180px"
              alt=''></img>


              <h2 className='container-degree'>{(weatherData?.main?.temp - 273.15).toFixed(2)} °C</h2>
              <h2 className='container-msg'>{weatherData.weather[0].description}</h2>

              <form className='form' onSubmit={handleSubmit}>
                <input className='input' type='text' placeholder='Enter city name' onChange={handleChange}></input>
                <button type='submit' >Get</button>
              </form>

            </div>
        </>
       )} 
           
          
          
      </div>
    </div>
  )
}

export default Whether