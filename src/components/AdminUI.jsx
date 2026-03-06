import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

function AdminUI() {
  const { kycRequests, approveKyc, revokeKyc } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('PENDING'); // PENDING, APPROVED, REVOKED

  const pendingReqs = kycRequests.filter(r => r.status === 'PENDING');
  const approvedReqs = kycRequests.filter(r => r.status === 'APPROVED');
  const revokedReqs = kycRequests.filter(r => r.status === 'REVOKED');

  return (
    <div className="admin-layout">
      <div className="admin-sidebar card" style={{ padding: '1rem' }}>
        <h3 style={{ padding: '0 1rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>Admin Dashboard</h3>
        <div className={`nav-item ${activeTab === 'PENDING' ? 'active' : ''}`} onClick={() => setActiveTab('PENDING')}>
          Requests Pending ({pendingReqs.length})
        </div>
        <div className={`nav-item ${activeTab === 'APPROVED' ? 'active' : ''}`} onClick={() => setActiveTab('APPROVED')}>
          Approved KYC ({approvedReqs.length})
        </div>
        <div className={`nav-item ${activeTab === 'REVOKED' ? 'active' : ''}`} onClick={() => setActiveTab('REVOKED')}>
          Revoked KYC ({revokedReqs.length})
        </div>
      </div>

      <div className="admin-content card">
        <h2 style={{ marginBottom: '1.5rem' }}>
          {activeTab === 'PENDING' ? 'Pending KYC Requests' : activeTab === 'APPROVED' ? 'Approved Identities' : 'Revoked Identities'}
        </h2>

        {activeTab === 'PENDING' && (
          pendingReqs.length === 0 ? <p style={{color: 'var(--text-muted)'}}>No pending requests.</p> :
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Wallet</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingReqs.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontFamily: 'monospace' }}>{req.wallet.substring(0,8)}...</td>
                    <td>{req.firstName} {req.lastName}</td>
                    <td>{req.dob}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => approveKyc(req.wallet)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Approve KYC
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'APPROVED' && (
          approvedReqs.length === 0 ? <p style={{color: 'var(--text-muted)'}}>No approved identities.</p> :
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Wallet</th>
                  <th>Name</th>
                  <th>Valid Until</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {approvedReqs.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontFamily: 'monospace' }}>{req.wallet.substring(0,8)}...</td>
                    <td>{req.firstName} {req.lastName}</td>
                    <td>{req.validUntil}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => revokeKyc(req.wallet)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'REVOKED' && (
          revokedReqs.length === 0 ? <p style={{color: 'var(--text-muted)'}}>No revoked identities.</p> :
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Wallet</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {revokedReqs.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontFamily: 'monospace' }}>{req.wallet.substring(0,8)}...</td>
                    <td>{req.firstName} {req.lastName}</td>
                    <td><span className="badge revoked">Revoked</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUI;
