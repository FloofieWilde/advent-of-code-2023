import React from 'react'
import { Link } from 'react-router-dom'

const GoBack = () => {
  return (
    <div className='goBack'>
        <Link to='/'>
            <span className="material-symbols-outlined">
                arrow_back
            </span>
        </Link>
    </div>
  )
}

export default GoBack
