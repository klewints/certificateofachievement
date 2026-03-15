# Stellar Certificate Verification (Soroban Smart Contract)

## 1. Project Description

This project implements a decentralized **Certificate Verification and Validation system** built using **Soroban smart contracts on the Stellar blockchain**.

The system allows institutions, organizations, and training providers to issue **tamper-proof digital certificates** whose authenticity can be verified publicly on the blockchain.

Instead of storing the full certificate document on-chain, the system stores a **cryptographic hash** representing the certificate data. This approach preserves privacy while ensuring that certificates cannot be altered or forged.

Once issued, the certificate becomes permanently recorded on the blockchain and can be verified by employers, institutions, or third parties without relying on the issuing authority.

---
SCREENSHOT LINK: ![Alt Text](https://github.com/klewints/certificateofachievement/blob/main/Screenshot%202026-03-15%20130324.png)


## 2. What it Does

The smart contract enables the following workflow:

### Certificate Issuance
An authorized issuer submits certificate data to the smart contract including:

- Certificate ID
- Recipient name
- Course or achievement
- Issuing authority
- Issue timestamp
- Certificate hash

The contract stores this record on-chain.

### Certificate Verification
Anyone can verify a certificate by providing the **certificate ID**.

The contract retrieves the certificate details stored on-chain and confirms whether it exists and matches the expected data.

### Tamper Detection
If someone alters the certificate document, its hash will not match the hash stored on-chain, allowing easy detection of tampering.
 SCREENSHOT LINK : ![Alt Text](https://github.com/klewints/certificateofachievement/blob/main/Screenshot%202026-03-15%20133032.png)
---

## 3. Features

### 1. Blockchain-Based Certificate Storage
Certificates are stored on the Stellar blockchain via a Soroban smart contract, ensuring immutability and public verifiability.

### 2. Certificate Hashing for Privacy
Only the cryptographic hash of the certificate is stored on-chain, protecting sensitive information while enabling verification.

### 3. Decentralized Verification
Anyone can verify certificates without contacting the issuing organization.

### 4. Unique Certificate IDs
Each certificate is assigned a unique ID to prevent duplication.

### 5. Tamper-Proof Records
Once recorded on the blockchain, certificate records cannot be altered or deleted.

### 6. Lightweight On-Chain Storage
The system minimizes blockchain storage usage by avoiding large document uploads.

### 7. Open Verification
Employers, universities, and institutions can independently verify credentials.

---

## 4. Smart Contract Functions

### issue_certificate()

Stores a new certificate on the blockchain.

Parameters:

- `id` — Unique certificate identifier
- `recipient` — Name of certificate recipient
- `course` — Course or achievement title
- `issuer` — Organization issuing the certificate
- `issued_at` — Unix timestamp of issuance
- `cert_hash` — Cryptographic hash of certificate document

---

### verify_certificate()

Retrieves certificate details from the blockchain using its ID.

Returns:

- Certificate data if it exists
- None if certificate does not exist

---

## 5. Example Use Case

1. A university issues a certificate to a student.
2. The certificate file is hashed using SHA256.
3. The hash and certificate metadata are submitted to the smart contract.
4. The certificate becomes permanently recorded on the Stellar blockchain.
5. An employer later verifies the certificate using the certificate ID.

---

## 6. Technology Stack

- **Stellar Blockchain**
- **Soroban Smart Contracts**
- **Rust**
- **SHA256 Certificate Hashing**

---

## 7. Deployed Smart Contract Link (DEPLOYEMENT LINK)
https://lab.stellar.org/r/testnet/contract/CC4UWFUMFVEDIOZFE4SWPMWXAK7UJFS6GZMY56BCNVMKU7EM5BOVHZPF

 https://stellar.expert/explorer/testnet/tx/d8b0e9010560b1f99f57f4dbf884070f6ba360b5d36487cbbab2d10c512211a7 
