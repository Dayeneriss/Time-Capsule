const { Client } = require('@hashicorp/hcp-vault-secrets');

const client = new Client({
  organizationId: process.env.HCP_ORG_ID,
  projectId: process.env.HCP_PROJECT_ID,
  appName: process.env.HCP_APP_NAME,
  clientId: process.env.HCP_CLIENT_ID,
  clientSecret: process.env.HCP_CLIENT_SECRET
});

async function getSecrets() {
  try {
    const secrets = await client.getSecrets();
    return {
      alchemyKey: secrets.ALCHEMY_API_KEY,
      pinataJWT: secrets.NEXT_PUBLIC_PINATA_JWT,
      privateKey: secrets.PRIVATE_KEY
    };
  } catch (error) {
    console.error('Error fetching secrets:', error);
    throw error;
  }
}

module.exports = { getSecrets };