import React from 'react'
import './Desktop.css'

const Desktop = () => {
  return (
    //display a stylish message to the user to use the mobile version of Telegram to play the game
    <div className='background'>
        <h1 className='heading'>MechaMon</h1>
        <h2 className='message'>Please use the mobile version of Telegram to play this game.</h2>
        <a href="https://t.me/mechamon_bot" className='play-link'> Play </a>


    </div>
  )
}

export default Desktop
