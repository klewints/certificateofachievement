#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Env, symbol_short, String, Map};

#[derive(Clone)]
#[contracttype]
pub struct Certificate {
    pub id: String,
    pub recipient: String,
    pub course: String,
    pub issuer: String,
    pub issued_at: u64,
    pub cert_hash: String,
}

#[contract]
pub struct CertificateContract;

#[contractimpl]
impl CertificateContract {

    pub fn issue_certificate(
        env: Env,
        id: String,
        recipient: String,
        course: String,
        issuer: String,
        issued_at: u64,
        cert_hash: String,
    ) {

        let key = symbol_short!("CERTS");

        let mut certs: Map<String, Certificate> =
            env.storage().instance().get(&key).unwrap_or(Map::new(&env));

        if certs.contains_key(id.clone()) {
            panic!("Certificate already exists");
        }

        let cert = Certificate {
            id: id.clone(),
            recipient,
            course,
            issuer,
            issued_at,
            cert_hash,
        };

        certs.set(id, cert);
        env.storage().instance().set(&key, &certs);
    }

    pub fn verify_certificate(env: Env, id: String) -> Option<Certificate> {

        let key = symbol_short!("CERTS");

        let certs: Map<String, Certificate> =
            env.storage().instance().get(&key).unwrap_or(Map::new(&env));

        certs.get(id)
    }
}