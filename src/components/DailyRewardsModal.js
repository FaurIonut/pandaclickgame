import React, { useContext, useEffect, useState } from 'react';
import './DailyRewardsModal.css';
import axios from 'axios';
import ResourceContext from './context/ResourceContext';
import Notify from './Notify';

const DailyRewardsModal = ({ show, onClose, dailyRewards,id }) => {
  const [dailyReward, setDailyReward] = useState([]);
  const {setResources,resources,initData} = useContext(ResourceContext);
  const [open,setOpen]=useState(false);

  useEffect(() => {
    setDailyReward(dailyRewards);
  }, [dailyRewards]);
  if (!show) return null;
  const collectReward = (id) => {
    const time = new Date();
    const find = dailyRewards.find(reward => reward._id === id);
    if (new Date(find.time) > time) {
      if(navigator.vibrate)
        navigator.vibrate(80);
      return;
    }

    setDailyReward(dailyReward.map(reward =>
      reward._id === id ? { ...reward, claimed: true } : reward
    ));


    setResources({...resources,tokens:resources.tokens+find.reward});
    // setOpen(true);
    // const interval = setTimeout(() => {
    //   setOpen(false);
    // }, 3000);

    axios.post("https://mechamon.glitch.me"+ '/tasks/claim', null, {
      params: {
        initData,
        id
      },
    });
    // return () => clearInterval(interval);
  }


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          V
          </button>
        <h2>Daily Rewards</h2>
        <div className="daily-rewards">
          {dailyReward.map((reward) => (
            <div key={reward._id} className="reward">
              {reward.claimed ? <button className='container collected'>+ {reward.reward} <div className="metric"></div></button> :
              //add class name tobeclaimed when id==id
                <button 
                className={id===reward._id ? 'container tobeclaimed coins' : 'container coins'}
                onClick={() => collectReward(reward._id)}>{reward.reward} <div className="metric"></div> </button>
              }</div>
          ))}
        </div>
      </div>
      {/* <Notify message="Claimed Successfully" isOpen={open}/> */}
    </div>
  );
};

export default DailyRewardsModal;
