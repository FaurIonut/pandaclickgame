import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

import './index.css';

function Root() {
  const [isWebAppReady, setIsWebAppReady] = useState(false);

  useEffect(() => {
    WebApp.ready().then(() => setIsWebAppReady(true));
  }, []);

  if (!isWebAppReady) {
    return <div>Loading...</div>; // Optionally, a placeholder while WebApp is initializing
  }

  return (
    <TonConnectUIProvider manifestUrl="https://109.237.99.151:3000/tonconnect-manifest.json">
      <App />
    </TonConnectUIProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
