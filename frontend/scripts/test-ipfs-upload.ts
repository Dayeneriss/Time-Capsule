// scripts/test-ipfs-upload.ts
import { uploadToIPFS } from '../utils/pinata';
import fs from 'fs';
import path from 'path';

async function testIpfsUpload() {
  try {
    // Créer un fichier temporaire pour le test
    const testFilePath = path.join(__dirname, 'test-file.txt');
    fs.writeFileSync(testFilePath, 'Ceci est un fichier de test pour IPFS');

    // Convertir le fichier en File
    const testFile = new File([fs.readFileSync(testFilePath)], 'test-file.txt', { type: 'text/plain' });

    console.log('Tentative d\'upload IPFS...');
    const result = await uploadToIPFS(testFile);
    
    console.log('Résultat de l\'upload IPFS:', result);

    // Nettoyer le fichier temporaire
    fs.unlinkSync(testFilePath);
  } catch (error) {
    console.error('Erreur lors du test d\'upload IPFS:', error);
  }
}

testIpfsUpload();
