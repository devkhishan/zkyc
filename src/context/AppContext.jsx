import React, { createContext, useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

export const AppContext = createContext();

export const ADMIN_ADDRESSES = [
  '0x2337f0F7DBad82f2Ab5CdCf1B971e99Ec3a09AFa'.toLowerCase(),
];

export const AppProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [role, setRole] = useState(null); // 'ADMIN' or 'PERSON'
  const [kycRequests, setKycRequests] = useState(() => {
    const saved = localStorage.getItem('kycRequests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kycRequests', JSON.stringify(kycRequests));
  }, [kycRequests]);

  const disconnectWallet = () => {
    setWallet(null);
    setRole(null);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Force MetaMask to prompt for account selection instead of auto-reconnecting
        // This simulates a "disconnect" by requiring deliberate action on connect
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{
            eth_accounts: {}
          }]
        });

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const lowerAddress = address.toLowerCase();
        setWallet(lowerAddress);

        if (ADMIN_ADDRESSES.includes(lowerAddress)) {
          setRole('ADMIN');
        } else {
          setRole('PERSON');
        }
      } catch (err) {
        console.error("Failed to connect wallet", err);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  };

  const submitKyc = (formData) => {
    const newRequest = {
      id: Date.now().toString(),
      wallet,
      status: 'PENDING', // PENDING, APPROVED, REVOKED
      validUntil: null,
      ...formData
    };
    setKycRequests([...kycRequests.filter(req => req.wallet !== wallet), newRequest]);
  };

  const approveKyc = (walletAddr) => {
    setKycRequests(kycRequests.map(req => {
      if (req.wallet === walletAddr) {
        return { ...req, status: 'APPROVED', validUntil: 'January 01, 2030' };
      }
      return req;
    }));
  };

  const revokeKyc = (walletAddr) => {
    setKycRequests(kycRequests.map(req => {
      if (req.wallet === walletAddr) {
        return { ...req, status: 'REVOKED' };
      }
      return req;
    }));
  };

  useEffect(() => {
    let changed = false;
    const now = new Date();
    const updated = kycRequests.map(req => {
      if (req.status === 'APPROVED' && req.validUntil) {
        const validDate = new Date(req.validUntil + "T00:00:00Z");
        if (now > validDate && validDate.toString() !== 'Invalid Date') {
          changed = true;
          return { ...req, status: 'REVOKED' };
        }
      }
      return req;
    });
    if (changed) setKycRequests(updated);
  }, [kycRequests]);

  return (
    <AppContext.Provider value={{
      wallet, role, kycRequests, connectWallet, disconnectWallet, submitKyc, approveKyc, revokeKyc
    }}>
      {children}
    </AppContext.Provider>
  );
};
