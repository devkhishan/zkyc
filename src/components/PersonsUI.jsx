import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

function PersonsUI() {
  const { wallet, kycRequests, submitKyc } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [proof, setProof] = useState(null);
  
  // Find current user's request
  const userRequest = kycRequests.find(req => req.wallet === wallet);
  const status = userRequest ? userRequest.status : 'NO_KYC';

  const handleGenerateProof = () => {
    // mock ZK proof generation
    setTimeout(() => {
      setProof({
        pi_a: ["0x" + Math.random().toString(16).slice(2), "0x" + Math.random().toString(16).slice(2)],
        pi_b: [
          ["0x" + Math.random().toString(16).slice(2), "0x" + Math.random().toString(16).slice(2)],
          ["0x" + Math.random().toString(16).slice(2), "0x" + Math.random().toString(16).slice(2)]
        ],
        pi_c: ["0x" + Math.random().toString(16).slice(2), "0x" + Math.random().toString(16).slice(2)],
        protocol: "groth16",
        curve: "bn128"
      });
    }, 800);
  };

  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      firstName: '', lastName: '', dob: '', bloodGroup: '', address: '', phone: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Assume photo handled via standard file input, mock it for now.
      submitKyc(formData);
      setShowForm(false);
    };

    return (
      <form onSubmit={handleSubmit} className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Submit KYC Form</h2>
        <div className="form-group">
          <label className="form-label">Photo Upload</label>
          <input type="file" accept=".jpg,.png" required className="form-input" />
        </div>
        <div className="data-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" required className="form-input" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" required className="form-input" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
          </div>
        </div>
        <div className="data-grid">
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input type="date" required className="form-input" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <input type="text" required className="form-input" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea required className="form-input" rows="3" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input type="tel" required className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
        <button type="submit" className="btn btn-success">Submit for Verification</button>
      </form>
    );
  };

  const UserDetails = ({ request }) => (
    <div className="data-grid" style={{ marginTop: '1.5rem' }}>
      <div className="data-item"><div className="label">Name</div><div className="value">{request.firstName} {request.lastName}</div></div>
      <div className="data-item"><div className="label">DOB</div><div className="value">{request.dob}</div></div>
      <div className="data-item"><div className="label">Blood Group</div><div className="value">{request.bloodGroup}</div></div>
      <div className="data-item"><div className="label">Phone</div><div className="value">{request.phone}</div></div>
      <div className="data-item" style={{ gridColumn: '1 / -1' }}><div className="label">Address</div><div className="value">{request.address}</div></div>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {status === 'NO_KYC' && !showForm && (
        <div className="card center" style={{ textAlign: 'center' }}>
          <h2 style={{marginBottom: '0.5rem'}}>Identity Verification Required</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
            Complete your KYC to generate your Zero-Knowledge proof of identity.
          </p>
          <button className="btn" onClick={() => setShowForm(true)}>Complete KYC to Generate Proof</button>
        </div>
      )}

      {status === 'NO_KYC' && showForm && <RegistrationForm />}

      {status !== 'NO_KYC' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <h2>Your Identity Profile</h2>
            {status === 'PENDING' && <span className="badge pending">KYC Pending</span>}
            {status === 'APPROVED' && <span className="badge approved">Approved</span>}
            {status === 'REVOKED' && <span className="badge revoked">Access Revoked</span>}
          </div>
          
          <UserDetails request={userRequest} />

          {status === 'APPROVED' && (
             <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
               <button className="btn" onClick={handleGenerateProof}>Generate Proof</button>
               {proof && (
                 <div className="proof-box">
                   <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#fff' }}>ZK Proof Generated Successfully:</div>
                   <pre>{JSON.stringify(proof, null, 2)}</pre>
                 </div>
               )}
             </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PersonsUI;
