import React, { useContext, useEffect, useState } from 'react';
import './Referral.css';
import { parse } from 'querystring';
import Loading from './Loading';
import ResourceContext from './context/ResourceContext';
import Notify from './Notify';
import { set } from 'mongoose';

const Referral = () => {
  const [refers, setReferrals] = useState([]);

  const { initData } = useContext(ResourceContext);
  const data = parse(initData);
  const user = JSON.parse(data.user);
  const id = user.id;
  const { referrals, loading } = useContext(ResourceContext);
  const [open, setOpen] = useState(false);
  const link = "https://t.me/mechamon_bot/mecha?startapp=" + id;
  const referralLink = `https://t.me/share/url?url=${link}&text=Join%20this%20amazing%20app%20and%20earn%20rewards!`;
  const handleShare = () => {
    window.open(referralLink, '_blank');
  };

  useEffect(() => {
    if (!loading) {
      setReferrals(referrals);
    }
  }, [loading, referrals]);

  const handleCopy = () => {
    if (navigator.clipboard)
      navigator.clipboard.writeText(link)
    // setOpen(true);
    // const interval = setTimeout(() => {
    //   setOpen(false);
    // }, 3000);
    // return () => clearInterval(interval);
  };

  return (
    loading ? <Loading /> :
      <>
        <div className="referral-dashboard">
          <h2>Invite your friends</h2>
          <div className="dflex">
            <button className="referral-button" onClick={handleShare}>
              Via Telegram
            </button>
            <button className="copy dflex-around" onClick={handleCopy}>
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <div className="referral-info">
            <div className="dflex">

            </div>
          </div>
          <p className='container dflex-start'>
            <div className='container'>           
               {refers.length} friends - {refers.length * 2000}
              <div className="metric">
              </div>
              </div>
              <span className="container">
                <div className="refer-info">
                  Invite and Get &nbsp;
                </div>+ 2000 <div className="metric"></div> &nbsp; </span>
            </p>
          <div className="referral-list">
            {refers.length > 0 ?
              refers.map((referral) => (
                <div key={referral.id} className="referral">
                  <span className="referral-name">{referral.name}</span>
                  <span className="referral-coins container">+ 2000
                    <div className="metric"></div></span>
                </div>
              )) : <div className="no-referrals">No referrals yet</div>}
          </div>
        </div>
        {/* <Notify message="Link copied" isOpen={open} /> */}

      </>

  );
};

export default Referral;
