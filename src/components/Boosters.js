import React, { useState, useRef, useEffect, useContext } from 'react';
import './Boosters.css';
import axios from 'axios';
import ResourceContext from './context/ResourceContext';
import Notify from './Notify';

function Boosters() {
  const [tokens, setTokens] = useState(null);
  const [bots, setBots] = useState(0);
  const [botCost, setBotCost] = useState(null);
  const [tapLimit, setTapLimit] = useState(50);
  const [tokensPerSecond, setTokensPerSecond] = useState(0);
  const [limit, setLimit] = useState(50);
  const [tapSize, setTapSize] = useState(1);
  const [tapSizeCost, setTapSizeCost] = useState(null);
  const [tapCost, setTapCost] = useState(null);
  const botRef = useRef(null);
  const tapRef = useRef(null);
  const tapSizeRef = useRef(null);
  const {resources,loading,setResources,initData} = useContext(ResourceContext);
  // const[isOpen,setOpen]=useState(false);

  useEffect(() => {
    if(!loading){
      setTokens(resources.tokens);
      setBots(resources.bots);
      setLimit(resources.tapLimit);
      setTapSize(resources.tapSize);
      setTapLimit(resources.tapsAvailable);
    }
  } , [loading]);


  useEffect(() => {
    setBotCost(Math.ceil(3.4 * 100 * Math.pow(4.1, bots)));


  }, [bots]);

  useEffect(() => {
    setTapCost(Math.ceil(3.4 * 100 * Math.pow(1.01, limit)));

  }, [limit]);

  useEffect(() => {
    setTapSizeCost(Math.ceil(3.4 * 100 * Math.pow(4.01, tapSize)));

  }, [tapSize]);

  const handleBuyBot = () => {
    if (tokens >= botCost) {
      axios.post("https://mechamon.glitch.me" + '/boosters/upgrade', null, {
        params: {
          initData: initData,
          booster: 'mechaBot'
        }
      })
      setTokens(tokens - botCost);
      botRef.current.classList.add('active')
      setTimeout(() => {
        botRef.current.classList.remove('active')
      }, 500)
      setBots(bots + 1);
      setTokensPerSecond(tokensPerSecond + 1);
      setResources({...resources,tokens:tokens-botCost,bots:bots+1});
    }
  };

  const handleBuyTaps = () => {
    if (tokens >= tapCost) {
      axios.post("https://mechamon.glitch.me" + '/boosters/upgrade', null, {
        params: {
          initData: initData,
          booster: 'tapLimit'
        }
      })
      tapRef.current.classList.add('active')
      setTimeout(() => {
        tapRef.current.classList.remove('active')
      }, 500)
      setTokens(tokens - tapCost);
      setLimit(limit + 50);
      setTapLimit(tapLimit + 50);
      setResources({...resources,tokens:tokens-tapCost,tapLimit:limit+50,tapsAvailable:tapLimit+50});
    }
  };
  const handleBuyTapSize = (e) => {
    if (tokens >= tapSizeCost) {
      axios.post("https://mechamon.glitch.me" + '/boosters/upgrade', null, {
        params: {
          initData: initData,
          booster: 'tapSize'
        }
      })
      tapSizeRef.current.classList.add('active')
      setTimeout(() => {
        tapSizeRef.current.classList.remove('active')
      }, 500)
      setTokens(tokens - tapSizeCost);
      setTapSize(tapSize + 1);
      setResources({...resources,tokens:tokens-tapSizeCost,tapSize:tapSize+1});

    }
  };

  return (
<>

<div className='boosters'>
        <div className='stats-booster'>
          <div className="highlight tokens">
            <div className="logo">
            </div>
            {tokens}
          </div>
          <div>Bots: <span className="highlight bots">{bots}</span></div>
        </div>
        <div className='booster-btns booster_1' >
          <div className="dflex">
            <div className="bot"></div>
            MechaBot Level {bots + 1}
          </div>
          <button ref={botRef} onClick={handleBuyBot} disabled={tokens < botCost}>
            <span className="highlight">  {botCost} </span> <div className="metric"></div></button>
        </div>
        <div className='booster-btns booster_2' >
          <div className="dflex">
            <div className="limit"></div>
            TapLimit Upgrade
          </div>

          <button ref={tapRef} onClick={handleBuyTaps} disabled={tokens < tapCost}><span className="highlight"> {tapCost} </span><div className="metric"></div></button>
        </div>
        <div className='booster-btns booster_3' >
          <div className="dflex">
          <div className="size"></div>
          TapSize Upgrade
          </div>
          <button ref={tapSizeRef} onClick={handleBuyTapSize} disabled={tokens < tapSizeCost}><span className="highlight">  {tapSizeCost} </span><div className="metric"></div></button>
        </div>
        <div className="info">
      Mecha goes offline after 3 hours you go offline.
      </div>
      </div>
      {/* <Notify message="Purchased Successfully " isOpen={isOpen}/> */}
      </>
  );
}

export default Boosters;
