import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import personService from './services/persons'

function App() {
  //  const [newNote, setNewNote] = useState('')
  const [persons, setPersons] = useState([]) //persons,  name convention, contact as info of the person[naming vars and objects are important to remember]
  //    { name: 'Arto Hellas', number: '040-123456' },
  // { name: 'Ada Lovelace', number: '39-44-5323523' },
  // { name: 'Dan Abramov', number: '12-43-234345' },
  // { name: 'Mary Poppendieck', number: '39-23-6423122' } [IMPORTANT] NO need for these objects since I added the objects into db.json and used useEffect from server to add to
  //useState of persons!!!
  const [newName, setNewName] = useState('') //better to put these two lines as one grouped object
  const [newNum, setNewNum] = useState()
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, []) //first useEffect paramater is the function, 2nd is the frequency of this function(like when and how many times to run)
  //--2nd method for this useEffect--
  // useEffect(()=> {
  //   const eventHandler = response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
  //   }
  //   const promise = axios.get('http://localhost:3001/notes')
  //   promise.then(eventHandler)
  // },[])
  console.log(persons)

  const addContacts = (event) => {
    event.preventDefault()
    console.log(persons[0].name)
    const duplicatePerson = persons.find(p => p.name === newName)
    if ((typeof duplicatePerson !== 'undefined' && duplicatePerson.number !== newNum)) {
      const changedNumb = { name: duplicatePerson.name, number: newNum }
      personService.update(duplicatePerson.id, changedNumb).then(returnedNum => {
        if (window.confirm(`${returnedNum.name} is already added to phonebook,
         replace the old number with new one?`)) {
            setPersons(persons.map(person =>
               person.id !== duplicatePerson.id ? person : returnedNum)) }
        setNewName('')
        setNewNum('')
        

      })
      return
    } else if (typeof duplicatePerson !== 'undefined') {
      console.log('test')
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNum('')
      return 

    }

    const personsObject = {
      name: newName,
      number: newNum,
    }
    personService.create(personsObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNum('')
    })

  }

  const deleteButton = name => {
    personService.remove(name)
    setPersons(persons.filter(person => person.id !== name.id))
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Add A New Contact</h2>
      <form onSubmit={addContacts}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value)
            }}
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNum}
            onChange={(e) => {
              setNewNum(e.target.value)
            }}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter persons={persons} deleteButton={deleteButton} />
      {/* breaking each component to do it own thing */}
    </div>
  )
}

export default App
