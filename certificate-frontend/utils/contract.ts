import * as FreighterAPI from '@stellar/freighter-api';

export const contractAddress: string = 'CC4UWFUMFVEDIOZFE4SWPMWXAK7UJFS6GZMY56BCNVMKU7EM5BOVHZPF'; // Replace with your Soroban contract address

export async function connectWallet(): Promise<string> {
  try {
    const result = await FreighterAPI.getAddress();

    if (result.error) {
      throw new Error(result.error.message || 'Failed to connect to Freighter wallet');
    }

    return result.address;
  } catch (error) {
    throw new Error('Failed to connect to Freighter wallet');
  }
}

