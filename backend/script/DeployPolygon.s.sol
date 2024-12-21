// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {TimeCapsule} from "../contracts/TimeCapsule.sol";
import {Pricing} from "../contracts/Pricing.sol";

contract DeployPolygon is Script {
    function run() external {
        // Récupère la clé privée depuis une variable d'environnement
        string memory privateKey = string.concat("0x", vm.envString("PRIVATE_KEY"));
        uint256 deployerPrivateKey = vm.parseUint(privateKey);
        
        // Démarre la diffusion des transactions
        vm.startBroadcast(deployerPrivateKey);

        // Déploie d'abord le contrat Pricing
        Pricing pricing = new Pricing(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174); // Adresse USDC sur Polygon
        
        // Déploie ensuite le contrat TimeCapsule
        TimeCapsule timeCapsule = new TimeCapsule();

        // Transfère la propriété du contrat Pricing au contrat TimeCapsule
        pricing.transferOwnership(address(timeCapsule));

        vm.stopBroadcast();

        // Log les adresses des contrats déployés
        console2.log("Pricing deployed to:", address(pricing));
        console2.log("TimeCapsule deployed to:", address(timeCapsule));
    }
}
