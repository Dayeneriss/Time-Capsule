"use client";

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function PricingPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-[#1E2530]">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Tarification des Capsules Temporelles</h1>
        
        {/* Modèles de base */}
        <div className="bg-[#262B35] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Modèles de base</h2>
          
          <div className="space-y-8">
            {/* Petite Capsule */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl text-[#FFC107] mb-3">Petite Capsule</h3>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-2xl font-bold text-white">2 USDC</p>
                <p className="text-gray-400">Jusqu'à 10 Mo, 5 ans</p>
              </div>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Stockage sécurisé pendant 5 ans
                </li>
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Parfait pour les souvenirs personnels
                </li>
              </ul>
            </div>

            {/* Capsule Moyenne */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl text-[#FFC107] mb-3">Capsule Moyenne</h3>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-2xl font-bold text-white">6 USDC</p>
                <p className="text-gray-400">Jusqu'à 50 Mo, 10 ans</p>
              </div>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Stockage sécurisé pendant 10 ans
                </li>
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Idéal pour les collections de photos
                </li>
              </ul>
            </div>

            {/* Grande Capsule */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl text-[#FFC107] mb-3">Grande Capsule</h3>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-2xl font-bold text-white">11 USDC</p>
                <p className="text-gray-400">Jusqu'à 100 Mo, 20 ans</p>
              </div>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Stockage sécurisé pendant 20 ans
                </li>
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Parfait pour les archives familiales
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Options Premium */}
        <div className="bg-[#262B35] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Options Premium</h2>
          
          <div className="space-y-8">
            {/* Capsule Premium */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl text-[#FFC107] mb-3">Capsule Premium</h3>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-2xl font-bold text-white">25 USDC</p>
                <p className="text-gray-400">Jusqu'à 100 Mo, 50 ans</p>
              </div>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Stockage sécurisé pendant 50 ans
                </li>
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Accès aux fonctionnalités premium
                </li>
              </ul>
            </div>

            {/* Capsule Éternelle */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl text-[#FFC107] mb-3">Capsule Éternelle</h3>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-2xl font-bold text-white">65 USDC</p>
                <p className="text-gray-400">Jusqu'à 100 Mo, durée indéfinie</p>
              </div>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Stockage permanent
                </li>
                <li className="flex items-center">
                  <span className="text-[#FFC107] mr-2">✓</span>
                  Toutes les fonctionnalités premium incluses
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Services supplémentaires */}
        <div className="bg-[#262B35] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Services supplémentaires</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-300">
              <span>Stockage supplémentaire</span>
              <span className="font-semibold">0.5 USDC / 10 Mo</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Paramètres d'accès personnalisés</span>
              <span className="font-semibold">1.5 USDC</span>
            </div>
          </div>
        </div>

        {/* Frais de Transaction */}
        <div className="bg-[#262B35] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Frais de Transaction</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-4">
              <div className="flex justify-between items-center text-gray-300 mb-2">
                <span>Frais fixe par transaction</span>
                <span className="font-semibold">0.50 USDC</span>
              </div>
              <p className="text-sm text-gray-400">Appliqué à chaque création de capsule</p>
            </div>
            
            <div className="border-b border-gray-700 pb-4">
              <div className="flex justify-between items-center text-gray-300 mb-2">
                <span>Commission sur transaction</span>
                <span className="font-semibold">2%</span>
              </div>
              <p className="text-sm text-gray-400">Pourcentage appliqué sur le montant total</p>
            </div>

            {/* Exemple de calcul */}
            <div className="bg-[#1E2530] rounded-lg p-4">
              <h3 className="text-lg text-[#FFC107] mb-3">Exemple de calcul</h3>
              <p className="text-gray-300 mb-2">Pour une Petite Capsule à 2 USDC :</p>
              <ul className="space-y-2 text-gray-400">
                <li>Prix de base : 2.00 USDC</li>
                <li>Frais fixe : +0.50 USDC</li>
                <li>Commission (2%) : +0.04 USDC</li>
                <li className="text-white font-semibold pt-2 border-t border-gray-700">
                  Total : 2.54 USDC
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          {isConnected ? (
            <Link 
              href="/create" 
              className="inline-block bg-[#FFC107] text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-[#FFD54F] transition"
            >
              Créer une capsule
            </Link>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 mb-4">Connectez votre portefeuille pour créer une capsule</p>
              <ConnectKitButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
