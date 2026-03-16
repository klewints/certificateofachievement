import {
  SorobanRpc,
  TransactionBuilder,
  BASE_FEE,
  Networks,
  Account,
  xdr
} from '@stellar/stellar-sdk';
import * as FreighterAPI from '@stellar/freighter-api';

const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;
const contractId = 'CC4UWFUMFVEDIOZFE4SWPMWXAK7UJFS6GZMY56BCNVMKU7EM5BOVHZPF';

// Helper to create string ScVal
function stringScVal(value: string): xdr.ScVal {
  return xdr.ScVal.scvString(value);
}

// Helper to create u64 ScVal (for timestamp)
function u64ScVal(value: number): xdr.ScVal {
  return xdr.ScVal.scvU64(new xdr.Uint64(value));
}

// Helper to build invoke host function operation
function buildInvokeOperation(
  method: string,
  args: xdr.ScVal[]
): xdr.Operation {
  const contractIdObj = xdr.ScAddress.scAddressTypeContract(
    Buffer.from(contractId, 'hex')
  );

  const funcName = xdr.ScVal.scvString(method);

  const hostFn = xdr.HostFunction.hostFunctionTypeInvokeContract(
    new xdr.InvokeContractArgs({
      contractAddress: contractIdObj,
      functionName: funcName,
      args: args
    })
  );

  const op = xdr.Operation.invokeHostFunction(
    new xdr.InvokeHostFunctionOp({
      hostFunction: hostFn,
      auth: [] // No auth for simulation
    })
  );

  return op;
}

export async function verifyCertificate(id: string) {
  // For read-only calls, we can use a dummy source
  const dummySource = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF';

  const args = [stringScVal(id)];
  const op = buildInvokeOperation('verify_certificate', args);

  const account = new Account(dummySource, '0');
  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(op)
    .setTimeout(30)
    .build();

  const simulated = await server.simulateTransaction(transaction);
  return simulated;
}

export async function issueCertificate(
  id: string,
  recipient: string,
  course: string,
  issuer: string,
  certHash: string
) {
  const issuedAt = Date.now();

  // Get the user's public key from Freighter
  const publicKey = await FreighterAPI.getPublicKey();

  const args = [
    stringScVal(id),
    stringScVal(recipient),
    stringScVal(course),
    stringScVal(issuer),
    u64ScVal(issuedAt),
    stringScVal(certHash)
  ];

  // First simulate to get the footprint and cost
  const dummySource = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF';
  const op = buildInvokeOperation('issue_certificate', args);

  const account = new Account(dummySource, '0');
  const simTx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(op)
    .setTimeout(30)
    .build();

  const simulated = await server.simulateTransaction(simTx);

  if (simulated.error) {
    throw new Error(`Simulation failed: ${simulated.error}`);
  }

  // Now build the real transaction with the user's account
  const userAccount = await server.getAccount(publicKey);
  const realOp = buildInvokeOperation('issue_certificate', args);

  const transaction = new TransactionBuilder(userAccount, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(realOp)
    .setTimeout(30)
    .build();

  // Sign with Freighter
  const signedXdr = await FreighterAPI.signTransaction(transaction.toXDR(), {
    network: 'TESTNET',
    networkPassphrase
  });

  // Submit the signed transaction
  const signedTx = TransactionBuilder.fromXDR(signedXdr, networkPassphrase);
  const result = await server.sendTransaction(signedTx);

  return result;
}