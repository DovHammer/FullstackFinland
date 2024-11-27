import { useEffect, useState } from 'react'
import axios from 'axios'
import personsServises from './services/persons'
import './App.css'

const Person = ({person, remove}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={() => remove(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({array, remove}) => {
  return(
    <div>
        {array.map(person =>
          <Person key={person.id} person={person} remove={remove}/>
        )}
    </div>
  )
}

const Filter = ({value, onChange}) => {
  return(
    <div>
      filter shown with 
      <input
        value={value}
        onChange={onChange}
        />
    </div>
  )
}

const Form = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange }) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input 
            value={nameValue}
            onChange={nameOnChange}
            />
        </div>
        <div>
          number: <input 
            value={numberValue}
            onChange={numberOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Notification = ({message}) =>{
  if (message === null){
    return null
  }
  return(
    <div className = 'error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)

  useEffect(() => {
    personsServises
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPersons = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person =>
      person.name === newName
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if(confirmUpdate) {
        const updatedPerson = {...existingPerson, number: newNumber}

        personsServises
          .update(existingPerson.id, updatedPerson)
          .then( returnedPerson => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? returnedPerson : person
            ))
            
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Error updating ${newName}'s number: ${error.message}`)
          }
          )
      }
      return
    }

    const personsObject = {
      name: newName,
      number: newNumber,
    }
    
    personsServises
      .create(personsObject)
      .then(newPerson => {
        //added message 
        setAddedMessage(`added ${newPerson.name}`)
        setTimeout(() => {
          setAddedMessage(null)
        }, 2000)

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRemove = id => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsServises
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`Failed to delete ${personToDelete.name}. Error: ${error.message}`)
        })
    }
  }

  return (
    <div>
      <Notification message = {addedMessage}/>
      <h2>Phonebook</h2>

      <Filter value={searchTerm} onChange={handleSearchChange}/>
      
      <h3>Add a new</h3>

      <Form 
        onSubmit={addPersons} 
        nameValue={newName} 
        nameOnChange={handleNameChange}
        numberValue={newNumber} 
        numberOnChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      
      <Persons array={filteredPersons} remove={handleRemove}/>
    </div>
  )
}

export default App