import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

// Basic Components for Testing
function Home() {
  return <h1>Home Page</h1>;
}
function Layout() {
  return <div><h1>Layout Component</h1></div>;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Show loading for 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <div>Loading...</div> // Simple Loading Message for Debugging
      ) : (
        <div className="App h-screen">
          <ReduxProvider store={store}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} /> {/* Test the Home Route */}
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
