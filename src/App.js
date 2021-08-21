import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import personService from './services/persons'

function App() {
  //  const [newNote, setNewNote] = useState('')
  const [persons, setPersons] = useState([]) //persons,  name convention, contact as info of the person[naming vars and objects are important to remember]

  const [newName, setNewName] = useState('') //better to put these two lines as one grouped object
  const [newNum, setNewNum] = useState()
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
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
    const duplicatePerson = persons.find((p) => p.name === newName) //we need to first find if there are any same names in the contact with the find function
    if (
      typeof duplicatePerson !== 'undefined' &&
      duplicatePerson.number !== newNum
    ) {
      //check if are any duplicates through typeof, and the duplicate's number is not the same for the possibility of the next part
      const changedNumb = { name: duplicatePerson.name, number: newNum } //here, we save the changed number for the same person
      personService
        .update(duplicatePerson.id, changedNumb)
        .then((returnedNum) => {
          if (
            window.confirm(`${returnedNum.name} is already added to phonebook,
         replace the old number with new one?`)
          ) {
            setPersons(
              persons.map((person) =>
                person.id !== duplicatePerson.id ? person : returnedNum
              )
            )
          } //here, we just copy old copy of the save state objects and just update the new number of duplicate person to the state
          setNewName('')
          setNewNum('')
        })
      return
    } else if (typeof duplicatePerson !== 'undefined') {
      //function here is for just checkin both the same number and person when adding contacts. No need number check since the first conditional checks it
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
    personService.create(personsObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNum('')
    })
  }

  const deleteButton = (name) => {
    personService.remove(name) //the name parameter, here, are each of the individual contacts through the map array from persons state, then remove function communicates with the backend
    //and uses the name's id to find and deletes the contact item.
    setPersons(persons.filter((person) => person.id !== name.id)) //since the backend update doesn't immediately change the frontend ui, each contact(name) has to be filtered to check
    //which item is as the same as the name to be deleted and removed from the frontend
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
