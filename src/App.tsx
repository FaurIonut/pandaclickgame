import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MinePage from "./pages/Mine";
import { useAuthStore } from "./store/auth";
import WebApp from "@twa-dev/sdk";
import LoadingScreen from "./components/LoadingScreen";
import { __DEV__, API_URL } from "./utils/constants";
import FriendsPage from "./pages/Friends";
import EarnPage from "./pages/Earn";
import { usePlayerStore } from "./store/player";
import { qr } from "./images";

const App: React.FC = () => {
  const { setAuthToken } = useAuthStore();
  const { setPassiveEarnModal } = usePlayerStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const telegramData = __DEV__
      ? {
          id: 465670876,
          username: "gunturkh",
          first_name: "-",
          last_name: "-",
        }
      : WebApp?.initDataUnsafe?.user;

    const playerLogin = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: `${telegramData?.id}`,
            username: telegramData?.username,
            first_name: telegramData?.first_name,
            last_name: telegramData?.last_name,
            ...(WebApp?.initDataUnsafe?.start_param && {
              referral_code: WebApp?.initDataUnsafe?.start_param,
            }),
          }),
        });
        const result = await response.json();
        if (result.status) {
          setAuthToken(result?.data?.token);
          setPassiveEarnModal(true);
        }
      } catch (error) {
        console.error("Login error", error);
      } finally {
        setLoading(false);
      }
    };

    playerLogin();
  }, [setAuthToken]);

  // Only show QR code for macOS
  if (WebApp && WebApp.platform === "macos" && !__DEV__) {
    return (
      <img src={qr} alt="Loading" className="w-full h-screen object-cover" />
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mine" element={<MinePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/earn" element={<EarnPage />} />
      </Routes>
    </Router>
  );
};

export default App;
