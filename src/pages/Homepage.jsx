import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <>
    
    <Link to='/quiz'>
        <button>start quiz</button>
    </Link>
    <Link to='/adminlogin' >
    <button>Admin login</button>
    </Link>    
    </>
  )
}

export default Homepage