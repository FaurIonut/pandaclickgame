import React, { useEffect, useState } from 'react'
import './Notify.css';

const Notify = ({message,isOpen}) => {
    const [open,setOpen] = useState(isOpen);
    console.log(isOpen);

    if(!isOpen) return null;

  return (
    open && <div className='message-box'>
        <div className="dflex">
        <div className="close"></div>
    <p className="message">
      {message}

    </p>
        </div>
    </div>
  )
}

export default Notify
