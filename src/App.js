import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Home from "./page/Home.tsx";
import Ranking from "./page/Ranking.tsx";
import Quest from "./page/Quest.tsx";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout.tsx";
import Loading from "./component/Loading.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Boost from "./page/Boost.tsx";
import Task from "./page/Task.tsx";
import Airdrop from "./page/Airdrop.tsx";
// import MobileQR from "./component/MobileQR"; // Uncomment if needed

function App() {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(isMobile);
    }, []);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(true);
        }, 2000);
    }, []);

    return (
        <Router>
            {loading ? (
                <Loading />
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
