const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function getSecrets() {
  try {
    const secrets = {
      ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
      NEXT_PUBLIC_PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT,
      PRIVATE_KEY: process.env.PRIVATE_KEY
    };

    // Vérifier que les secrets requis sont présents
    const missingSecrets = Object.entries(secrets)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingSecrets.length > 0) {
      throw new Error(`Secrets manquants : ${missingSecrets.join(', ')}`);
    }

    return secrets;
  } catch (error) {
    console.error('Erreur lors de la récupération des secrets:', error);
    throw error;
  }
}

module.exports = {
  getSecrets
};
