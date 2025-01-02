const { execSync } = require('child_process');

async function testSecrets() {
  try {
    const secretsJson = execSync('hcp vault-secrets secrets read ALCHEMY_API_KEY --app timecapsule1 --format=json').toString().trim();
    const secrets = JSON.parse(secretsJson);
    console.log('Secret récupéré avec succès !');
    console.log('Clé Alchemy présente :', !!secrets.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des secrets :', error);
  }
}

testSecrets();
