import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Home from "./page/Home";
import Ranking from "./page/Ranking";
import Quest from "./page/Quest";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import Loading from "./component/Loading";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Boost from "./page/Boost";
import Task from "./page/Task";
import Airdrop from "./page/Airdrop";
// import MobileQR from "./component/MobileQR";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set loading to false after 1 second

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading /> // Show loading screen for 1 second
      ) : (
        <div className="App h-screen">
          <ReduxProvider store={store}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="ranking" element={<Ranking />} />
                <Route path="quest" element={<Quest />} />
                <Route path="boost" element={<Boost />} />
                <Route path="task" element={<Task />} />
                <Route path="airdrop" element={<Airdrop />} />
              </Route>
            </Routes>
            <ToastContainer />
          </ReduxProvider>
        </div>
      )}
    </Router>
  );
}

export default App;
