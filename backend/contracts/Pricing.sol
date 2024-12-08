// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Pricing
 * @dev Contrat gérant la tarification des capsules temporelles
 */
contract Pricing is Ownable {
    // Structure pour stocker les détails d'une capsule
    struct CapsuleType {
        uint256 basePrice; // Prix en USDC (6 décimales)
        uint256 maxSize;   // Taille maximale en Mo
        uint256 duration;  // Durée en années (0 pour indéfini)
    }

    // Token USDC
    IERC20 public usdcToken;

    // Frais fixes et pourcentage
    uint256 public constant FIXED_FEE = 500000;     // 0.50 USDC (6 décimales)
    uint256 public constant FEE_PERCENTAGE = 200;   // 2.00% (2 décimales)

    // Frais de transaction fixes pendant la période promotionnelle (0.5 USDC)
    uint256 private constant PROMO_FIXED_FEE = 5e5; // 0.5 USDC (6 décimales)
    uint256 private constant PROMO_PERCENTAGE_FEE = 200; // 2% (en base points, 100 = 1%)

    // Mapping des types de capsules
    mapping(string => CapsuleType) public capsuleTypes;

    // Prix du stockage supplémentaire (par 10 Mo)
    uint256 public extraStoragePrice = 500000; // 0.50 USDC par 10 Mo

    // Prix des paramètres d'accès personnalisés
    uint256 public customAccessPrice = 1500000; // 1.50 USDC

    // Date de fin de la période promotionnelle
    uint256 public promotionalPeriodEnd;

    // Événements
    event CapsuleTypeUpdated(string name, uint256 basePrice, uint256 maxSize, uint256 duration);
    event PriceCalculated(address user, string capsuleType, uint256 totalPrice);

    constructor(address _usdcToken) Ownable() {
        usdcToken = IERC20(_usdcToken);
        // Définir la fin de la période promotionnelle à 6 mois à partir du déploiement
        promotionalPeriodEnd = block.timestamp + 180 days;

        // Initialisation des types de capsules
        capsuleTypes["small"] = CapsuleType(2000000, 10, 5);     // 2 USDC, 10 Mo, 5 ans
        capsuleTypes["medium"] = CapsuleType(6000000, 50, 10);    // 6 USDC, 50 Mo, 10 ans
        capsuleTypes["large"] = CapsuleType(11000000, 100, 20);   // 11 USDC, 100 Mo, 20 ans
        capsuleTypes["premium"] = CapsuleType(25000000, 100, 50); // 25 USDC, 100 Mo, 50 ans
        capsuleTypes["eternal"] = CapsuleType(65000000, 100, 0);  // 65 USDC, 100 Mo, indéfini
    }

    /**
     * @dev Calcule le prix total pour une capsule
     * @param capsuleType Type de capsule ("small", "medium", etc.)
     * @param extraStorageUnits Nombre d'unités de 10 Mo supplémentaires
     * @param customAccess Si true, ajoute le prix des paramètres d'accès personnalisés
     */
    function calculatePrice(
        string memory capsuleType,
        uint256 extraStorageUnits,
        bool customAccess
    ) public view returns (uint256) {
        require(capsuleTypes[capsuleType].basePrice > 0, "Type de capsule invalide");

        // Pendant la période promotionnelle
        if (block.timestamp <= promotionalPeriodEnd) {
            uint256 transactionValue = extraStorageUnits * 10 * 1e6; // Convertir la taille en USDC (1 USDC par Mo)
            uint256 percentageFee = (transactionValue * PROMO_PERCENTAGE_FEE) / 10000;
            return PROMO_FIXED_FEE + percentageFee;
        }

        // Après la période promotionnelle, utiliser la tarification normale
        uint256 totalPrice = capsuleTypes[capsuleType].basePrice;

        // Ajout du stockage supplémentaire
        if (extraStorageUnits > 0) {
            totalPrice += extraStorageUnits * extraStoragePrice;
        }

        // Ajout des paramètres d'accès personnalisés
        if (customAccess) {
            totalPrice += customAccessPrice;
        }

        // Ajout des frais fixes
        totalPrice += FIXED_FEE;

        // Ajout de la commission (2%)
        uint256 fee = (totalPrice * FEE_PERCENTAGE) / 10000;
        totalPrice += fee;

        return totalPrice;
    }

    /**
     * @dev Vérifie si un utilisateur a assez de USDC et l'allowance nécessaire
     */
    function checkPaymentPossible(
        address user,
        string memory capsuleType,
        uint256 extraStorageUnits,
        bool customAccess
    ) public view returns (bool) {
        uint256 totalPrice = calculatePrice(capsuleType, extraStorageUnits, customAccess);
        return usdcToken.balanceOf(user) >= totalPrice &&
               usdcToken.allowance(user, address(this)) >= totalPrice;
    }

    /**
     * @dev Effectue le paiement pour une capsule
     */
    function processCapsulePayment(
        address user,
        string memory capsuleType,
        uint256 extraStorageUnits,
        bool customAccess
    ) external returns (bool) {
        uint256 totalPrice = calculatePrice(capsuleType, extraStorageUnits, customAccess);
        
        require(checkPaymentPossible(user, capsuleType, extraStorageUnits, customAccess), 
                "Solde USDC insuffisant ou allowance non accordee");

        // Transfert des USDC
        require(usdcToken.transferFrom(user, address(this), totalPrice),
                "Transfert USDC echoue");

        emit PriceCalculated(user, capsuleType, totalPrice);
        return true;
    }

    /**
     * @dev Vérifie si la période promotionnelle est toujours active
     * @return bool Vrai si la période promotionnelle est active
     */
    function isPromotionalPeriod() public view returns (bool) {
        return block.timestamp <= promotionalPeriodEnd;
    }

    // Fonctions administratives (onlyOwner)

    function updateCapsuleType(
        string memory name,
        uint256 basePrice,
        uint256 maxSize,
        uint256 duration
    ) external onlyOwner {
        capsuleTypes[name] = CapsuleType(basePrice, maxSize, duration);
        emit CapsuleTypeUpdated(name, basePrice, maxSize, duration);
    }

    function updateExtraStoragePrice(uint256 newPrice) external onlyOwner {
        extraStoragePrice = newPrice;
    }

    function updateCustomAccessPrice(uint256 newPrice) external onlyOwner {
        customAccessPrice = newPrice;
    }

    function withdrawUSDC(address to, uint256 amount) external onlyOwner {
        require(usdcToken.transfer(to, amount), "Transfert USDC echoue");
    }
}
