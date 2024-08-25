import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import MobileQR from "./component/MobileQR";
function App() {
    const [loading, setLoading] = useState(true);
     const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
      const isMobile =
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
        );
       setIsMobile(isMobile);
   }, []);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(true);
        }, 3000);
    }, []);
    return (_jsx(Router, { children: /*!isMobile ? (
          <MobileQR />
        ) : */ loading ? (_jsx(Loading, {})) : (_jsx("div", { className: "App h-screen", children: _jsxs(ReduxProvider, { store: store, children: [_jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "ranking", element: _jsx(Ranking, {}) }), _jsx(Route, { path: "quest", element: _jsx(Quest, {}) }), _jsx(Route, { path: "boost", element: _jsx(Boost, {}) }), _jsx(Route, { path: "task", element: _jsx(Task, {}) }), _jsx(Route, { path: "airdrop", element: _jsx(Airdrop, {}) })] }) }), _jsx(ToastContainer, {})] }) })) }));
}
export default App;
