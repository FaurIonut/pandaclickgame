import ReactDOM from "react-dom/client";
import App from "src/App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";

import "src/index.css";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://109.237.99.151:3000/tonconnect-manifest.json">
    <App />
  </TonConnectUIProvider>
);
