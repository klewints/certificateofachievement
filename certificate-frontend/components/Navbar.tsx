"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { connectWallet } from "../lib/freighter";

export default function Navbar() {

  const [address,setAddress] = useState("");

  const handleConnect = async () => {
    const addr = await connectWallet();
    if(addr){
      setAddress(addr);
    }
  }

  return (
    <div className="flex justify-between p-4 bg-gray-900 text-white">

      <h1>Certificate Verification System</h1>

      <button
        onClick={handleConnect}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        {address ? address.slice(0,6)+"..." : "Connect Wallet"}
      </button>

    </div>
  );
}