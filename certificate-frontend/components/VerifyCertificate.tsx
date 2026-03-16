"use client";

import React, { useState } from 'react';
import { verifyCertificate } from '../lib/contract';
import CertificateCard from './CertificateCard';

interface CertificateData {
  id: string;
  recipient: string;
  course: string;
  issuer: string;
  issuedAt: number;
  certificateHash: string;
}

const VerifyCertificate: React.FC = () => {
  const [id, setId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!id.trim()) {
      alert('Please enter a certificate ID');
      return;
    }

    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const simulated = await verifyCertificate(id);
      const retval = simulated.result?.retval;

      // For demonstration, assume retval contains certificate data
      // In a real implementation, you'd decode the XDR properly
      if (retval && typeof retval === 'object' && retval.id) {
        setResult(retval);
      } else {
        setError('Certificate not found on blockchain');
      }
    } catch (err) {
      setError('Error verifying certificate: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Verify Certificate</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Certificate ID"
          className="flex-1 border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {result && (
        <div className="mt-4">
          <CertificateCard certificate={result as CertificateData} />
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;