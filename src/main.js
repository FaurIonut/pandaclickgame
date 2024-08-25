import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";
import "./index.css";
WebApp.ready();
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(TonConnectUIProvider, { manifestUrl: "https://109.237.99.151:3000/tonconnect-manifest.json", children: _jsx(App, {}) }));
