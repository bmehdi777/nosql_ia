import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/App.css'

const App = () => {
  return (
    <div className='app'>
      <div className='app__airbnb'>
        <Link to={'/airbnb'}>AirBnb</Link>
      </div>
      <div className='app__reconnaissance'>
        <Link to={'/reconnaissance'}>Reconnaissance d'image</Link>
      </div>
    </div>
  )
}

export default App
