import React, { useState, useEffect, useContext, useRef } from 'react';
import './Game.css';
import axios from 'axios';
import ResourceContext from './context/ResourceContext';
import { set } from 'mongoose';

function Game() {
  const [tokens, setTokens] = useState(0);
  const [bots, setBots] = useState(0);
  const [tapActions, setTapActions] = useState(0);
  const [tapLimit, setTapLimit] = useState(50);
  const [limit, setLimit] = useState(50);
  const [tapSize, setTapSize] = useState(1);
  const { resources, loading, setResources,collectables,setCollectables,initData} = useContext(ResourceContext);
  const tapRef = useRef(null);
  const [animation, setAnimation] = useState(false);

  const colors = [,'rgb(0, 255, 255)','rgb(255, 255, 0)','rgb(252, 198, 81)',,'rgb(155, 182, 193)','rgb(255, 255, 255)'];
useEffect(() => {
    if (!loading) {
      setTokens(resources.tokens);
      setBots(resources.bots);
      setLimit(resources.tapLimit);
      setTapSize(resources.tapSize);
      setTapLimit(resources.tapsAvailable);
    }
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCollectables(collectables=>collectables+bots);
    }, 1000);
    return () => clearInterval(interval);
  }, [bots, tokens]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tapLimit < limit) {
        setTapLimit(tapLimit => tapLimit + 1);
        setResources(prev => ({ ...prev, tapsAvailable: tapLimit + 1 }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [tapLimit, limit]);

  const handleTap = (e) => {
    e.preventDefault();
    if (tapLimit < tapSize) return;
    
    tapRef.current.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    if (navigator.vibrate) {
      navigator.vibrate(90);
    }
    setTokens(tokens => tokens + tapSize);
    setTapLimit(tapLimit => tapLimit - tapSize);
    setTapActions(tapActions => tapActions + tapSize);
    setResources(prev => ({
      ...prev,
      tokens: tokens + tapSize,
      tapsAvailable: tapLimit - tapSize
    }));

    const touchPoints = e.changedTouches || [e];
    Array.from(touchPoints).forEach(touch => {
      const plusOne = document.createElement('div');
      plusOne.textContent = `+${tapSize}`;
      plusOne.className = 'plus-one';
      plusOne.style.left = `${touch.clientX}px`;
      plusOne.style.top = `${touch.clientY}px`;
      document.body.appendChild(plusOne);
      plusOne.addEventListener('animationend', () => {
        plusOne.remove();
      });
    });
  };
  const collectCoins = () => {
    setTokens(tokens => tokens + collectables);
    setResources(prev => ({ ...prev, tokens: tokens + collectables }));
    setCollectables(0);
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  }
  useEffect(() => {
    if (animation) {
      const plusOne = document.createElement('div');
      tapRef.current.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
      if (navigator.vibrate) {
        navigator.vibrate(90);
      }
      plusOne.className = 'plus-one';
      document.body.appendChild(plusOne);
      plusOne.addEventListener('animationend', () => {
        plusOne.remove();
      });
    } else {
      document.querySelector('.collect-coins').classList.remove('plusOne');
    }
  }, [animation]);


  useEffect(() => {
    const interval = setInterval(() => {
      if (tapActions > 0) {
        sendTapActionsToBackend(tapActions);
        setTapActions(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [tapActions]);

  const sendTapActionsToBackend = (actions) => {
    axios.post('https://mechamon.glitch.me/boosters/updateCoins', {
      actions
    }, {
      params: {
        initData: initData
      }
    });
  };
  return (
    <div className='game-out'>
      <div className='stats'>
        <div className='tokens'>
          <div className="logo"></div>
          <div className="highlight tokens">{tokens}</div>
        </div>
        <p>Bots: <span className="highlight">{bots}</span></p>
      </div>
      <div
        className="tap-out"
        onTouchStart={handleTap}
      >
        <div className="tap-mid">
          <div className="tap-in" ref={tapRef} >

          </div>
        </div>
      </div>

      <div>
          <p>Remaining Taps: <span className='highlight'>{tapLimit}</span>/{limit}</p>
        <div className="tap-bar">
          <div
            className="tap-fill"
            style={{ width: `${(tapLimit / limit) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="collectables dflex-col">
        <button className="highlight container  collect-coins" disabled={bots===0 || collectables===0} onClick={collectCoins}>
          Claim  {collectables}
           <div className="metric currency"></div>
           </button>
        <p>MechaBots started  mining</p>
      </div>
    </div>
  );
}

export default Game;
