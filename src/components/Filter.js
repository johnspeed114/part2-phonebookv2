import React, { useState } from 'react'
import Names from './Names'
import personService from '../services/persons'

const Filter = ({ persons, deleteButton }) => {
  const [filterValue, setFilterValue] = useState()

  const personsToShow = persons.filter((person) => {
    let lowerName = person.name.toLowerCase()
    return lowerName.includes(filterValue)
  })



  return (
    <div>
      filter name shown with{' '}
      <input
        value={filterValue}
        onChange={(e) => {
          console.log(e.target.value)
          setFilterValue(e.target.value.toLowerCase())
        }}
      />
      <ul>
        {filterValue === undefined
          ? persons.map((name) => <Names key={name.name} name={name} deleteButton={() => deleteButton(name)} />)
          : personsToShow.map((name) => <Names key={name.name} name={name} deleteButton={() => deleteButton(name)} />)}
      </ul>
    </div>
  )
}
export default Filter
