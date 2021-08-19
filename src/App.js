import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Names from './components/Names'

import Filter from './components/Filter'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [persons, setPersons] = useState([]) //persons,  name convention, contact as info of the person[naming vars and objects are important to remember]
  //    { name: 'Arto Hellas', number: '040-123456' },
  // { name: 'Ada Lovelace', number: '39-44-5323523' },
  // { name: 'Dan Abramov', number: '12-43-234345' },
  // { name: 'Mary Poppendieck', number: '39-23-6423122' } [IMPORTANT] NO need for these objects since I added the objects into db.json and used useEffect from server to add to
  //useState of persons!!!
  const [newName, setNewName] = useState('') //better to put these two lines as one grouped object
  const [newNum, setNewNum] = useState()
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
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
  console.log('render', notes.length, 'notes')

  const addContacts = (event) => {
    event.preventDefault()
    console.log(persons[0].name)
    if (persons.some((person) => person.name === newName)) {
      console.log('test')
      return alert(`${newName} is already added to phonebook`)
    }
    const personsObject = {
      name: newName,
      number: newNum,
    }
    setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNum('')
  }
  // const addNote = (e) => {
  //   e.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     date: new Date(),
  //     important: Math.random() < 0.5,
  //   }
  //   axios.post('http://localhost:3001/notes', noteObject).then((response) => {
  //     setNotes(notes.concat(response.data))
  //     setNewNote('')
  //   })
  // }
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
      <Filter persons={persons} />
      {/* breaking each component to do it own thing */}
    </div>
  )
}

export default App
