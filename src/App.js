import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Tasks from './components/Tasks';
import Referral from './components/Referral';
import Navbar from './components/Navbar';
import './App.css';
import Boosters from './components/Boosters';
import Desktop from './Desktop';
import ResourceContext from './components/context/ResourceContext';
import Loading from './components/Loading';


function App() {
      const {loading}=useContext(ResourceContext);
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
      useEffect(() => {
          if(!initData || window.Telegram.WebApp.platform==='tdesktop' || window.Telegram.WebApp.platform==='web' || window.Telegram.WebApp.platform==='macos' || window.Telegram.WebApp.platform==='windows' || window.Telegram.WebApp.platform==='linux' || window.Telegram.WebApp.platform==='unknown' || window.Telegram.WebApp.initData==='') {
              setDesktop(true)
          }
      }, [])
      if(isDesktop) return (
        <Desktop/>
      )

  return (
      loading?<Loading/>:
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Game/>} />
          <Route path="/boosters" element={<Boosters/>} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/referral" element={<Referral/>} />
        </Routes>
      </div>
      <Navbar/>
    </Router>
  );
}

export default App;
