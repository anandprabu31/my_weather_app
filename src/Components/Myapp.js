import React, { useState } from 'react'
import axios from 'axios';
import cloud from "./images/Clouds.png"
import rain from "./images/Rain.png"
import clear from "./images/Clear.png"
import mist from "./images/mist.png"
import err from "./images/error.png"


const Myapp = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState();
    const [error, setError] = useState();

    const API_KEY = "fc48f30a4614ec08a85d2ff4c2c7b663";

    const handleInput = (event) => {
        setSearch(event.target.value);
    } 
     const handleEnter = (event) => {
        if (event.key === 'Enter') {
          myFun();
        }
      };

    const myFun = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
            const jsonData = response.data;
            setData(jsonData);
    
            if (search === "") {
                setError("Please Enter a City Name");
            } else if (jsonData.cod === '404') {
                setError("Please Enter a Valid City Name!");
            } else {
                setError("");
            }
            setSearch("");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("Please Enter a Valid City Name!");
            } else {
                setError("An error occurred while fetching the data.");
            }
        }
    };

    // Conditional background colors based on weather
    const weatherCondition = data?.weather ? data.weather[0].main : "default";
    const backgroundStyle = {
        Clouds: "bg-clouds",
        Rain: "bg-rain",
        Clear: "bg-clear",
        Mist: "bg-mist",
        default: "bg-default"
    }[weatherCondition] || "bg-default"; 

    return (
        <>
            <div className={`container mt-5 ${backgroundStyle}`}>
                {/* Search Section */}
                <div className='d-flex justify-content-center'>
                    <input
                        className='form-control me-2 w-50 text-dark'
                        type='text'
                        placeholder='Enter City, Country'
                        value={search}
                        onChange={handleInput}
                        onKeyDown={handleEnter}
                        style={{ backgroundColor: "#f0f0f0", borderRadius: '8px' }}
                    />
                    <button className='btn btn-search' onClick={myFun}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className='alert alert-danger mt-3 text-center'>
                        <p>{error}</p>
                        <img src={err} alt="Error" width="150" />
                    </div>
                )}

                {/* Weather Information */}
                {data && data.weather && (
                    <div className='text-center mt-4 weather-info'>
                        <h2 className='cityName'>{data.name}</h2>
                        
                        {/* Weather Icons */}
                        <div className='my-3'>
                            {data.weather[0].main === "Clouds" && <img src={cloud} alt="Cloudy" width="100" />}
                            {data.weather[0].main === "Rain" && <img src={rain} alt="Rain" width="100" />}
                            {data.weather[0].main === "Clear" && <img src={clear} alt="Clear" width="100" />}
                            {data.weather[0].main === "Mist" && <img src={mist} alt="Mist" width="100" />}
                            {data.weather[0].main === "Haze" && <img src={cloud} alt="Hazy" width="100" />}
                        </div>

                        {/* Temperature and Weather Description */}
                        <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
                        <p className='climate'>{data.weather[0].description}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Myapp;
