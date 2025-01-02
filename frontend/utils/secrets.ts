// utils/secrets.ts
export async function getSecrets() {
  try {
    const response = await fetch('/api/secrets?secret=NEXT_PUBLIC_PINATA_JWT');
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du secret');
    }

    const data = await response.json();
    
    return {
      pinataJwt: data.NEXT_PUBLIC_PINATA_JWT || null
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des secrets:', error);
    return { pinataJwt: null };
  }
}
