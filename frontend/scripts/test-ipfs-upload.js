// scripts/test-ipfs-upload.js
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

console.log('Environnement chargé :');
console.log('Chemin du .env:', path.resolve(__dirname, '../.env.local'));

async function uploadToIPFS(file) {
  try {
    const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
    
    if (!PINATA_JWT) {
      throw new Error('JWT Pinata non trouvé dans les variables d\'environnement');
    }

    console.log('Début de l\'upload IPFS');
    console.log('JWT disponible:', PINATA_JWT ? 'Oui' : 'Non');

    const formData = new FormData();
    formData.append('file', file, {
      filename: 'test-file.txt',
      contentType: 'text/plain'
    });

    console.log('Envoi de la requête à Pinata...');
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', 
      formData, 
      {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${PINATA_JWT}`
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    console.log('Statut de la réponse:', response.status);
    console.log('Données de la réponse:', JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.IpfsHash) {
      console.error('Aucun hash IPFS dans la réponse');
      console.error('Réponse complète:', JSON.stringify(response.data, null, 2));
      throw new Error('Pas de CID retourné par Pinata');
    }

    console.log('Upload réussi ! Hash IPFS:', response.data.IpfsHash);
    return response.data.IpfsHash;

  } catch (error) {
    console.error('Erreur lors de l\'upload :', error);
    if (error.response) {
      console.error('Détails de l\'erreur:', error.response.data);
    }
    throw error;
  }
}

async function testIpfsUpload() {
  try {
    // Créer un fichier de test
    const testFilePath = path.join(__dirname, 'test-file.txt');
    fs.writeFileSync(testFilePath, 'Ceci est un test ' + new Date().toISOString());

    // Créer un stream de lecture
    const fileStream = fs.createReadStream(testFilePath);

    // Upload le fichier
    const ipfsHash = await uploadToIPFS(fileStream);
    console.log('Test réussi ! Hash IPFS:', ipfsHash);

    // Nettoyage
    fs.unlinkSync(testFilePath);
  } catch (error) {
    console.error('Test échoué:', error);
  }
}

testIpfsUpload();
