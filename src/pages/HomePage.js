import React from 'react'

import {Link} from 'react-router-dom'
const HomePage = () => {
  return (
    <div className="container-fluid">
    <div className="content">
      <h2 className="mb-2">Welcome to HP's</h2>
      <h4>Feel free to explore the content</h4>
      <div className='mt-3'>
      <Link to="/signup" className='Hp-button'>Sign Up</Link>
      <Link to="/login" className='Hp-button'>Login</Link>
      </div>
    </div>
   
  </div>
  )
}

export default HomePage