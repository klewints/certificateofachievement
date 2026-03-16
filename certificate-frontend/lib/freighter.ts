import * as FreighterAPI from '@stellar/freighter-api';

export async function connectWallet(): Promise<string> {
  const isConnected = await FreighterAPI.isConnected();

  if (!isConnected) {
    throw new Error('Freighter wallet is not installed or not connected');
  }

  const publicKey = await FreighterAPI.getPublicKey();
  return publicKey;
}