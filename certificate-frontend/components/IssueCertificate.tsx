"use client";
"use client";

import React, { useState } from 'react';
import { issueCertificate } from '../lib/contract';

const IssueCertificate: React.FC = () => {
  const [id, setId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [course, setCourse] = useState('');
  const [issuer, setIssuer] = useState('');
  const [certificateHash, setCertificateHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIssue = async () => {
    if (!id.trim() || !recipient.trim() || !course.trim() || !issuer.trim() || !certificateHash.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await issueCertificate(id, recipient, course, issuer, certificateHash);
      alert('Certificate issued successfully!');
      // Clear form
      setId('');
      setRecipient('');
      setCourse('');
      setIssuer('');
      setCertificateHash('');
    } catch (error) {
      alert('Error issuing certificate: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Issue Certificate</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Certificate ID"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <input
          type="text"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          placeholder="Issuer"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <input
          type="text"
          value={certificateHash}
          onChange={(e) => setCertificateHash(e.target.value)}
          placeholder="Certificate Hash"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleIssue}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Issuing...' : 'Issue Certificate'}
        </button>
      </div>
    </div>
  );
};

export default IssueCertificate;