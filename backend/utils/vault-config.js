// backend/utils/vault-config.js
const { execSync } = require('child_process');

async function getSecrets() {
  try {
    // Utiliser HCP Vault Secrets pour récupérer les secrets
    const secrets = JSON.parse(
      execSync('hcp vault-secrets secrets read --app timecapsule1 --format=json').toString().trim()
    );

    return {
      alchemyKey: secrets.ALCHEMY_API_KEY,
      privateKey: secrets.PRIVATE_KEY
    };
  } catch (error) {
    console.error('Erreur HCP Vault Secrets:', error);
    throw error;
  }
}

module.exports = { getSecrets };