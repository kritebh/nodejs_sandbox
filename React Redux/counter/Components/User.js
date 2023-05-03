import React from 'react'

function User({name,email}) {
  return (
    <div>
        <p>Name - {name}</p>
        <p>Email - {email}</p>
        <hr></hr>
    </div>
  )
}

export default User