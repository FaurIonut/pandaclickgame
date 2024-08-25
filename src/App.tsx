import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./Layout"; // Import Layout
import Home from "./page/Home"; // Import Home

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Keep loading simple and short for now

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <div>Loading...</div> // Simple loading message
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Test if Home is rendered */}
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;
