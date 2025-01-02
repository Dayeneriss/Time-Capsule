// backend/pages/api/secrets.js
import { execSync } from 'child_process';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { secret } = req.query;

    if (!secret) {
      return res.status(400).json({ error: 'No secret name provided' });
    }

    // Récupérer le secret depuis HashiCorp Vault
    const secretValue = execSync(`hcp vault-secrets secrets read ${secret} --app timecapsule1`).toString().trim();

    return res.status(200).json({ 
      [secret]: secretValue 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du secret:', error);
    return res.status(500).json({ 
      error: 'Impossible de récupérer le secret',
      details: error.message 
    });
  }
}
