import {useState, useEffect} from "react";
import axios from 'axios';

const OneCountry = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const city = country.capital[0]
  const [weather, setWeather] = useState({main: {temp: 0.0}, wind: {speed:0.0}})
  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`).then((response) => {
      console.log(response.data.main.temp, response.data.wind.speed)
      setWeather(response.data)
    })

  }, [])

   return (<div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital[0]}<br/>
    population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {Object.values(country.languages).map(val => <li>{val}</li>)}
    </ul>
    <img src={country.flags.png} width="150" height="150"/>
    <h3>Weather in {country.capital[0]}</h3>
    <p>
      <b>temperature: </b>{weather.main.temp} celsius<br/>
      <b>wind: </b>{weather.wind.speed} m/s
    </p>
  </div>)
}

const Toggle = ({country, show}) => {
  if (show) {
    return <OneCountry country={country}/>
  }
  return <></>
}

const Button = ({country}) => {
  const [show, setShow] = useState(false)
  return <><button onClick={() => setShow(!show)}>show</button><Toggle country={country} show={show} /><br /></>
}

const Country = ({searchText, countries}) => {
  console.log(searchText)
  const selected = countries.filter(ctry => 
    ctry.name.common.toLowerCase().includes(searchText.toLowerCase()) )
  console.log(selected.map(sel => sel.name.common))
  if (selected.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (selected.length > 1) {
    return <div>{selected.map(sel=>
        <>{sel.name.common}<Button country={sel}/></>)}</div>
  } else if (selected.length === 1) {
    const country = selected[0]
   return <OneCountry country={country}/>
  }
  return <></>
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState("")

  console.log(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    //axios.get("https://restcountries.com/v3.1/all").then((response) => {
    axios.get("http://localhost:3001/countries").then((response) => {
      console.log(response.data[1].name['common'])
      setCountries(response.data)

    })

  }, [])

  const handleTextChange = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <div className="App">
      <div>find countries <input value={searchText} onChange={handleTextChange}></input></div>
      <Country searchText={searchText} countries={countries}/>
    </div>
  );
}

export default App;
