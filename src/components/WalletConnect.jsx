import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function WalletConnect() {
  const { connectWallet } = useContext(AppContext);

  return (
    <div className="card" style={{ maxWidth: '400px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>ZKYC Identity</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
        Connect your Ethereum wallet to manage your True Identity Zero-Knowledge Proofs or administer the ZKYC network.
      </p>
      <button className="btn" onClick={connectWallet} style={{ width: '100%', fontSize: '1.125rem', padding: '1rem' }}>
        <svg style={{ width: '24px', height: '24px', marginRight: '0.75rem' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 11H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 15H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Connect MetaMask
      </button>
    </div>
  );
}

export default WalletConnect;
