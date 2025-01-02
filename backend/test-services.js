const { getSecrets } = require('./utils/secrets');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testPinata() {
    try {
        console.log('Test de Pinata IPFS...');
        const secrets = await getSecrets();
        const PINATA_JWT = secrets.NEXT_PUBLIC_PINATA_JWT;

        // Créer un fichier de test
        const testFilePath = path.join(__dirname, 'test.txt');
        fs.writeFileSync(testFilePath, 'Test IPFS upload ' + new Date().toISOString());

        const formData = new FormData();
        formData.append('file', fs.createReadStream(testFilePath));

        const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${PINATA_JWT}`,
                    ...formData.getHeaders()
                }
            }
        );

        console.log('✅ Pinata test réussi !');
        console.log('IPFS Hash:', response.data.IpfsHash);
        console.log('PinSize:', response.data.PinSize);

        // Nettoyer le fichier de test
        fs.unlinkSync(testFilePath);

    } catch (error) {
        console.error('❌ Erreur Pinata:', error.response?.data || error.message);
    }
}

async function testAlchemy() {
    try {
        console.log('\nTest d\'Alchemy sur Polygon Mainnet...');
        const secrets = await getSecrets();
        const ALCHEMY_API_KEY = secrets.ALCHEMY_API_KEY;

        const response = await axios.post(
            `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            {
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_blockNumber',
                params: []
            }
        );

        console.log('✅ Alchemy test réussi !');
        console.log('Dernier bloc Polygon:', parseInt(response.data.result, 16));

    } catch (error) {
        console.error('❌ Erreur Alchemy:', error.response?.data || error.message);
        if (error.response?.status === 403) {
            console.error('Assurez-vous que Polygon Mainnet est activé dans votre tableau de bord Alchemy');
        }
    }
}

async function runTests() {
    console.log('Démarrage des tests des services...\n');
    await testPinata();
    await testAlchemy();
}

runTests();
