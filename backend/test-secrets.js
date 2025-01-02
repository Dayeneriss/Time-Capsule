const { getSecrets } = require('./utils/secrets');

async function testSecrets() {
  try {
    console.log('Tentative de récupération des secrets...');
    const secrets = await getSecrets();
    
    console.log('Secrets récupérés avec succès !');
    console.log('ALCHEMY_API_KEY:', secrets.ALCHEMY_API_KEY ? '[PRÉSENT]' : '[MANQUANT]');
    console.log('NEXT_PUBLIC_PINATA_JWT:', secrets.NEXT_PUBLIC_PINATA_JWT ? '[PRÉSENT]' : '[MANQUANT]');
    console.log('PRIVATE_KEY:', secrets.PRIVATE_KEY ? '[PRÉSENT]' : '[MANQUANT]');
  } catch (error) {
    console.error('Erreur lors du test des secrets :', error);
  }
}

testSecrets();
