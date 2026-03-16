import React from 'react';

interface CertificateData {
  id: string;
  recipient: string;
  course: string;
  issuer: string;
  issuedAt: number;
  certificateHash: string;
}

interface CertificateCardProps {
  certificate: CertificateData;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-sm mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Certificate Details</h3>
      <div className="space-y-2">
        <div>
          <span className="font-medium text-gray-600">Certificate ID:</span>
          <p className="text-gray-800">{certificate.id}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Recipient:</span>
          <p className="text-gray-800">{certificate.recipient}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Course:</span>
          <p className="text-gray-800">{certificate.course}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Issuer:</span>
          <p className="text-gray-800">{certificate.issuer}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Issued At:</span>
          <p className="text-gray-800">{new Date(certificate.issuedAt).toLocaleString()}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Certificate Hash:</span>
          <p className="text-gray-800 text-sm break-all">{certificate.certificateHash}</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;