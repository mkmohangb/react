import {useState, useEffect} from "react";
import personService from './services/persons';

const Notification = ({message, type}) => {
  if (message === "") {
    return null
  }

  return (<div className={type}>{message}</div>)

}

function App() {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [searchText, setSearchText] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [statusType, setStatusType] = useState("")

  const handleNameChange = (event) => {
      setName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleTextUpdate = (event) => {
    setSearchText(event.target.value)
  }

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data)
    })

  }, [])
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))

  const handleAdd = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    if (found === undefined) {
      const person = {
        name: name,
        number: number,
        id: persons.length + 1
      }
      personService.create(person).then(response => {
        setPersons(persons.concat(response.data))
        setName("")
        setNumber("")})
      setStatusMessage(`Added ${name}`)
      setStatusType("add_update")
      
    } else {
      //window.alert(`${name} is already added to phonebook`)
      if (window.confirm(`${name} is already added to phonebook, replace the 
            old number with a new one?`)) {
          const person = {...found, number:number}
          const id = person.id
          personService.update(id, person).then((response) => {
            setPersons(persons.map(person=> person.id !== id ? person : response.data))
            setStatusMessage(`Updated ${name}`)
            setStatusType("add_update")
          })
          .catch(error => {
            setStatusMessage(`Information of ${name} has already been removed from server`)
            setStatusType("error")
            setPersons(persons.filter(person=>person.id != id))
          })
        setName("")
        setNumber("")
        
      }
    }
    setTimeout(() => {setStatusMessage("")}, 3000)
  }

  const handleDelete = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteEntry(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={statusMessage} type={statusType}/>
      <div>filter shown with <input value={searchText} onChange={handleTextUpdate}></input></div>
      <h2>add a new</h2>
      <form onSubmit={handleAdd}>
        <div>name: <input value={name} onChange={handleNameChange}></input></div>
        <div>number: <input value={number} onChange={handleNumberChange}></input></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.id}>
          {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>)}
      </ul>
    </div>
  );
}

export default App;
