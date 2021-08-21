import React from 'react'

const Names = ({ name, deleteButton }) => {
  return (
    <div>
      {name.name} {name.number} <button onClick={deleteButton}>delete</button>
    </div>
  )
}
export default Names
