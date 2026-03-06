import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import WalletConnect from './components/WalletConnect';
import AdminUI from './components/AdminUI';
import PersonsUI from './components/PersonsUI';

function App() {
  const { wallet, role, disconnectWallet } = useContext(AppContext);

  if (!wallet) {
    return (
      <div className="app-container center">
        <WalletConnect />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">ZKYC</div>
        <div className="wallet-badge" onClick={disconnectWallet} title="Click to disconnect">
          <div className="badge-content">
            {wallet.substring(0, 6)}...{wallet.substring(wallet.length - 4)}
            <span className={`role-badge ${role.toLowerCase()}`}>{role}</span>
          </div>
          <div className="badge-hover">
            Disconnect
          </div>
        </div>
      </header>
      <main className="main-content">
        {role === 'ADMIN' ? <AdminUI /> : <PersonsUI />}
      </main>
    </div>
  );
}

export default App;
