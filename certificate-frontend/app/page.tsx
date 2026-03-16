import Navbar from '../components/Navbar';
import VerifyCertificate from '../components/VerifyCertificate';
import IssueCertificate from '../components/IssueCertificate';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Blockchain Certificate Verification System
        </h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <VerifyCertificate />
          <IssueCertificate />
        </div>
      </div>
    </div>
  );
}
