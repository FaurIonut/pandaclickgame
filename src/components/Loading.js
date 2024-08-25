import React, { useEffect, useState } from 'react'
import './Loading.css'

const Loading = () => {
    const [text,setText]=useState('')
    const [random,setRandom]=useState('')
    const mechaQuotes=[
        "New Era",
        "New Beginning",
        "New World",
        "New Life",
        "New Hope",
        "New Dawn",
        "New Day",
        "New Chapter",
    ]


    useEffect(() => {
        const interval = setInterval(() => {
            setText(prevText => prevText.length > 2 ? '.' : prevText + '.');
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        setRandom(Math.floor(Math.random() * mechaQuotes.length));
    }, []);

  return (
    <div className='loading-img'>
        <h1 className='heading-1' >MechaMon</h1>
        <div>
        <div className="spinner">
            <div className="img"></div>
        </div>
            <span className="typer ">{mechaQuotes[random]}</span><span className="typer">{text}</span>
        <div className="social-media">
            <div className="tg"></div>
            <div className="x"></div>
            <div className="yt"></div>
        </div>
        <div className="loading">

        </div>
        </div>
      
    </div>
  )
}

export default Loading
