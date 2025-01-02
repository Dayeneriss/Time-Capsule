# TimeCapsule

Capture the magic of your memories. 
Create digital time capsules that will stand the test of time, preserving your memories forever.
![Capture d’écran 2024-12-10 à 21 40 14](https://github.com/user-attachments/assets/7a557371-fe34-4e54-a5dc-de8f22c4e7da)


## Table of Contents

- [Introduction](#introduction)
- [Link to the Application](#link-to-the-application)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Example Use Case](#example-use-case)
- [Technical Architecture](#technical-architecture)
- [Roadmap and Future Improvements](#roadmap-and-future-improvements)
- [Contributions](#contributions)
- [License](#license)

---

## Introduction

TimeCapsule is a decentralized application (dApp) that allows users to create digital time capsules. These capsules can contain messages, photos, videos, or any other digital content, and will only be accessible at a future date defined by the user.This project was developed as part of the ShapeCraft hackathon under the theme "World Forever." TimeCapsule addresses this challenge by offering an innovative solution to securely and immutably preserve digital memories using blockchain technology.

---

## Link to the Application

The TimeCapsule application is deployed and accessible online:👉 **Access TimeCapsule**

---

## Features

- **Time Travel**: Schedule the opening of your capsules for a future date.
- **Eternal Preservation**: Store your digital memories in an immutable vault.
- **Blockchain Security**: Ensure the integrity and confidentiality of your data through blockchain technology.
- **Intuitive Interface**: A simple and seamless user experience for creating and exploring capsules.

---

## Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Blockchain**: Solidity, Ethereum, Smart Contracts
- **Decentralized Storage**: IPFS (InterPlanetary File System)
- **Authentication**: WalletConnect, MetaMask
- **Deployment**: Vercel, Alchemy

---

## Example Use Case

### Creating a Time Capsule

1. Connect your Ethereum wallet.
1. Click on "Create a Capsule."
1. Add your digital files (photos, videos, messages).
1. Set an opening date.
1. Validate the blockchain transaction to secure your capsule.

### Concrete Example

**Use Case**: A parent creates a capsule for their child, containing a video and a message, which will only be accessible on the child’s 18th birthday.

---

## Technical Architecture

- **Frontend**: User interface developed with React.js.
- **Smart Contracts**: Time capsule management via Solidity smart contracts.
- **Decentralized Storage**: Files are stored on IPFS to ensure immutability.
- **Blockchain**: Ethereum is used for managing transactions and immutable data.
- **Authentication**: WalletConnect enables secure user connections.

---

## Roadmap and Future Improvements

While TimeCapsule is fully functional in its current version, several improvements are planned to enhance the user experience and strengthen security. These include:

1. **Account Abstraction**:

- Simplify blockchain interactions for non-technical users.
- Enable advanced features like sponsored payments (gasless transactions) and account recovery.
- This feature is a priority for future versions.

1. **Smart Contract Optimization**:

- Reduce gas costs for users.
- Add new features such as collaborative capsule management.

1. **User Interface Enhancements**:

- Integrate interactive tutorials to guide new users.
- Optimize accessibility for mobile devices.

1. **Multi-Chain Support**:

- Extend compatibility to other blockchains.

These improvements will be gradually deployed after the hackathon.

---

## Contributions

Contributions are welcome! If you’d like to contribute to TimeCapsule, please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
Time-Capsule
├─ .DS_Store
├─ .vscode
│  └─ settings.json
├─ README.md
├─ backend
│  ├─ .DS_Store
│  ├─ .package-lock.json
│  ├─ @openzeppelin
│  │  └─ contracts
│  │     ├─ README.md
│  │     ├─ access
│  │     │  ├─ AccessControl.sol
│  │     │  ├─ IAccessControl.sol
│  │     │  ├─ Ownable.sol
│  │     │  ├─ Ownable2Step.sol
│  │     │  ├─ extensions
│  │     │  │  ├─ AccessControlDefaultAdminRules.sol
│  │     │  │  ├─ AccessControlEnumerable.sol
│  │     │  │  ├─ IAccessControlDefaultAdminRules.sol
│  │     │  │  └─ IAccessControlEnumerable.sol
│  │     │  └─ manager
│  │     │     ├─ AccessManaged.sol
│  │     │     ├─ AccessManager.sol
│  │     │     ├─ AuthorityUtils.sol
│  │     │     ├─ IAccessManaged.sol
│  │     │     ├─ IAccessManager.sol
│  │     │     └─ IAuthority.sol
│  │     ├─ build
│  │     │  └─ contracts
│  │     │     ├─ AccessControl.json
│  │     │     ├─ AccessControlDefaultAdminRules.json
│  │     │     ├─ AccessControlEnumerable.json
│  │     │     ├─ AccessManaged.json
│  │     │     ├─ AccessManager.json
│  │     │     ├─ Address.json
│  │     │     ├─ Arrays.json
│  │     │     ├─ AuthorityUtils.json
│  │     │     ├─ Base64.json
│  │     │     ├─ BeaconProxy.json
│  │     │     ├─ BitMaps.json
│  │     │     ├─ Checkpoints.json
│  │     │     ├─ CircularBuffer.json
│  │     │     ├─ Clones.json
│  │     │     ├─ Comparators.json
│  │     │     ├─ Context.json
│  │     │     ├─ Create2.json
│  │     │     ├─ DoubleEndedQueue.json
│  │     │     ├─ ECDSA.json
│  │     │     ├─ EIP712.json
│  │     │     ├─ ERC1155.json
│  │     │     ├─ ERC1155Burnable.json
│  │     │     ├─ ERC1155Holder.json
│  │     │     ├─ ERC1155Pausable.json
│  │     │     ├─ ERC1155Supply.json
│  │     │     ├─ ERC1155URIStorage.json
│  │     │     ├─ ERC1155Utils.json
│  │     │     ├─ ERC1363.json
│  │     │     ├─ ERC1363Utils.json
│  │     │     ├─ ERC165.json
│  │     │     ├─ ERC165Checker.json
│  │     │     ├─ ERC1967Proxy.json
│  │     │     ├─ ERC1967Utils.json
│  │     │     ├─ ERC20.json
│  │     │     ├─ ERC20Burnable.json
│  │     │     ├─ ERC20Capped.json
│  │     │     ├─ ERC20FlashMint.json
│  │     │     ├─ ERC20Pausable.json
│  │     │     ├─ ERC20Permit.json
│  │     │     ├─ ERC20TemporaryApproval.json
│  │     │     ├─ ERC20Votes.json
│  │     │     ├─ ERC20Wrapper.json
│  │     │     ├─ ERC2771Context.json
│  │     │     ├─ ERC2771Forwarder.json
│  │     │     ├─ ERC2981.json
│  │     │     ├─ ERC4626.json
│  │     │     ├─ ERC721.json
│  │     │     ├─ ERC721Burnable.json
│  │     │     ├─ ERC721Consecutive.json
│  │     │     ├─ ERC721Enumerable.json
│  │     │     ├─ ERC721Holder.json
│  │     │     ├─ ERC721Pausable.json
│  │     │     ├─ ERC721Royalty.json
│  │     │     ├─ ERC721URIStorage.json
│  │     │     ├─ ERC721Utils.json
│  │     │     ├─ ERC721Votes.json
│  │     │     ├─ ERC721Wrapper.json
│  │     │     ├─ EnumerableMap.json
│  │     │     ├─ EnumerableSet.json
│  │     │     ├─ Errors.json
│  │     │     ├─ Governor.json
│  │     │     ├─ GovernorCountingFractional.json
│  │     │     ├─ GovernorCountingSimple.json
│  │     │     ├─ GovernorPreventLateQuorum.json
│  │     │     ├─ GovernorSettings.json
│  │     │     ├─ GovernorStorage.json
│  │     │     ├─ GovernorTimelockAccess.json
│  │     │     ├─ GovernorTimelockCompound.json
│  │     │     ├─ GovernorTimelockControl.json
│  │     │     ├─ GovernorVotes.json
│  │     │     ├─ GovernorVotesQuorumFraction.json
│  │     │     ├─ Hashes.json
│  │     │     ├─ Heap.json
│  │     │     ├─ IAccessControl.json
│  │     │     ├─ IAccessControlDefaultAdminRules.json
│  │     │     ├─ IAccessControlEnumerable.json
│  │     │     ├─ IAccessManaged.json
│  │     │     ├─ IAccessManager.json
│  │     │     ├─ IAuthority.json
│  │     │     ├─ IBeacon.json
│  │     │     ├─ ICompoundTimelock.json
│  │     │     ├─ IERC1155.json
│  │     │     ├─ IERC1155Errors.json
│  │     │     ├─ IERC1155MetadataURI.json
│  │     │     ├─ IERC1155Receiver.json
│  │     │     ├─ IERC1271.json
│  │     │     ├─ IERC1363.json
│  │     │     ├─ IERC1363Receiver.json
│  │     │     ├─ IERC1363Spender.json
│  │     │     ├─ IERC165.json
│  │     │     ├─ IERC1820Implementer.json
│  │     │     ├─ IERC1820Registry.json
│  │     │     ├─ IERC1822Proxiable.json
│  │     │     ├─ IERC1967.json
│  │     │     ├─ IERC20.json
│  │     │     ├─ IERC20Errors.json
│  │     │     ├─ IERC20Metadata.json
│  │     │     ├─ IERC20Permit.json
│  │     │     ├─ IERC2309.json
│  │     │     ├─ IERC2612.json
│  │     │     ├─ IERC2981.json
│  │     │     ├─ IERC3156FlashBorrower.json
│  │     │     ├─ IERC3156FlashLender.json
│  │     │     ├─ IERC4626.json
│  │     │     ├─ IERC4906.json
│  │     │     ├─ IERC5267.json
│  │     │     ├─ IERC5313.json
│  │     │     ├─ IERC5805.json
│  │     │     ├─ IERC6372.json
│  │     │     ├─ IERC721.json
│  │     │     ├─ IERC721Enumerable.json
│  │     │     ├─ IERC721Errors.json
│  │     │     ├─ IERC721Metadata.json
│  │     │     ├─ IERC721Receiver.json
│  │     │     ├─ IERC7674.json
│  │     │     ├─ IERC777.json
│  │     │     ├─ IERC777Recipient.json
│  │     │     ├─ IERC777Sender.json
│  │     │     ├─ IGovernor.json
│  │     │     ├─ ITransparentUpgradeableProxy.json
│  │     │     ├─ IVotes.json
│  │     │     ├─ Initializable.json
│  │     │     ├─ Math.json
│  │     │     ├─ MerkleProof.json
│  │     │     ├─ MerkleTree.json
│  │     │     ├─ MessageHashUtils.json
│  │     │     ├─ Multicall.json
│  │     │     ├─ Nonces.json
│  │     │     ├─ Ownable.json
│  │     │     ├─ Ownable2Step.json
│  │     │     ├─ P256.json
│  │     │     ├─ Packing.json
│  │     │     ├─ Panic.json
│  │     │     ├─ Pausable.json
│  │     │     ├─ Proxy.json
│  │     │     ├─ ProxyAdmin.json
│  │     │     ├─ RSA.json
│  │     │     ├─ ReentrancyGuard.json
│  │     │     ├─ ReentrancyGuardTransient.json
│  │     │     ├─ SafeCast.json
│  │     │     ├─ SafeERC20.json
│  │     │     ├─ ShortStrings.json
│  │     │     ├─ SignatureChecker.json
│  │     │     ├─ SignedMath.json
│  │     │     ├─ SlotDerivation.json
│  │     │     ├─ StorageSlot.json
│  │     │     ├─ Strings.json
│  │     │     ├─ Time.json
│  │     │     ├─ TimelockController.json
│  │     │     ├─ TransientSlot.json
│  │     │     ├─ TransparentUpgradeableProxy.json
│  │     │     ├─ UUPSUpgradeable.json
│  │     │     ├─ UpgradeableBeacon.json
│  │     │     ├─ VestingWallet.json
│  │     │     ├─ VestingWalletCliff.json
│  │     │     └─ Votes.json
│  │     ├─ finance
│  │     │  ├─ VestingWallet.sol
│  │     │  └─ VestingWalletCliff.sol
│  │     ├─ governance
│  │     │  ├─ Governor.sol
│  │     │  ├─ IGovernor.sol
│  │     │  ├─ TimelockController.sol
│  │     │  ├─ extensions
│  │     │  │  ├─ GovernorCountingFractional.sol
│  │     │  │  ├─ GovernorCountingSimple.sol
│  │     │  │  ├─ GovernorPreventLateQuorum.sol
│  │     │  │  ├─ GovernorSettings.sol
│  │     │  │  ├─ GovernorStorage.sol
│  │     │  │  ├─ GovernorTimelockAccess.sol
│  │     │  │  ├─ GovernorTimelockCompound.sol
│  │     │  │  ├─ GovernorTimelockControl.sol
│  │     │  │  ├─ GovernorVotes.sol
│  │     │  │  └─ GovernorVotesQuorumFraction.sol
│  │     │  └─ utils
│  │     │     ├─ IVotes.sol
│  │     │     └─ Votes.sol
│  │     ├─ interfaces
│  │     │  ├─ IERC1155.sol
│  │     │  ├─ IERC1155MetadataURI.sol
│  │     │  ├─ IERC1155Receiver.sol
│  │     │  ├─ IERC1271.sol
│  │     │  ├─ IERC1363.sol
│  │     │  ├─ IERC1363Receiver.sol
│  │     │  ├─ IERC1363Spender.sol
│  │     │  ├─ IERC165.sol
│  │     │  ├─ IERC1820Implementer.sol
│  │     │  ├─ IERC1820Registry.sol
│  │     │  ├─ IERC1967.sol
│  │     │  ├─ IERC20.sol
│  │     │  ├─ IERC20Metadata.sol
│  │     │  ├─ IERC2309.sol
│  │     │  ├─ IERC2612.sol
│  │     │  ├─ IERC2981.sol
│  │     │  ├─ IERC3156.sol
│  │     │  ├─ IERC3156FlashBorrower.sol
│  │     │  ├─ IERC3156FlashLender.sol
│  │     │  ├─ IERC4626.sol
│  │     │  ├─ IERC4906.sol
│  │     │  ├─ IERC5267.sol
│  │     │  ├─ IERC5313.sol
│  │     │  ├─ IERC5805.sol
│  │     │  ├─ IERC6372.sol
│  │     │  ├─ IERC721.sol
│  │     │  ├─ IERC721Enumerable.sol
│  │     │  ├─ IERC721Metadata.sol
│  │     │  ├─ IERC721Receiver.sol
│  │     │  ├─ IERC777.sol
│  │     │  ├─ IERC777Recipient.sol
│  │     │  ├─ IERC777Sender.sol
│  │     │  ├─ draft-IERC1822.sol
│  │     │  ├─ draft-IERC6093.sol
│  │     │  └─ draft-IERC7674.sol
│  │     ├─ metatx
│  │     │  ├─ ERC2771Context.sol
│  │     │  └─ ERC2771Forwarder.sol
│  │     ├─ package.json
│  │     ├─ proxy
│  │     │  ├─ Clones.sol
│  │     │  ├─ ERC1967
│  │     │  │  ├─ ERC1967Proxy.sol
│  │     │  │  └─ ERC1967Utils.sol
│  │     │  ├─ Proxy.sol
│  │     │  ├─ beacon
│  │     │  │  ├─ BeaconProxy.sol
│  │     │  │  ├─ IBeacon.sol
│  │     │  │  └─ UpgradeableBeacon.sol
│  │     │  ├─ transparent
│  │     │  │  ├─ ProxyAdmin.sol
│  │     │  │  └─ TransparentUpgradeableProxy.sol
│  │     │  └─ utils
│  │     │     ├─ Initializable.sol
│  │     │     └─ UUPSUpgradeable.sol
│  │     ├─ token
│  │     │  ├─ ERC1155
│  │     │  │  ├─ ERC1155.sol
│  │     │  │  ├─ IERC1155.sol
│  │     │  │  ├─ IERC1155Receiver.sol
│  │     │  │  ├─ extensions
│  │     │  │  │  ├─ ERC1155Burnable.sol
│  │     │  │  │  ├─ ERC1155Pausable.sol
│  │     │  │  │  ├─ ERC1155Supply.sol
│  │     │  │  │  ├─ ERC1155URIStorage.sol
│  │     │  │  │  └─ IERC1155MetadataURI.sol
│  │     │  │  └─ utils
│  │     │  │     ├─ ERC1155Holder.sol
│  │     │  │     └─ ERC1155Utils.sol
│  │     │  ├─ ERC20
│  │     │  │  ├─ ERC20.sol
│  │     │  │  ├─ IERC20.sol
│  │     │  │  ├─ extensions
│  │     │  │  │  ├─ ERC1363.sol
│  │     │  │  │  ├─ ERC20Burnable.sol
│  │     │  │  │  ├─ ERC20Capped.sol
│  │     │  │  │  ├─ ERC20FlashMint.sol
│  │     │  │  │  ├─ ERC20Pausable.sol
│  │     │  │  │  ├─ ERC20Permit.sol
│  │     │  │  │  ├─ ERC20Votes.sol
│  │     │  │  │  ├─ ERC20Wrapper.sol
│  │     │  │  │  ├─ ERC4626.sol
│  │     │  │  │  ├─ IERC20Metadata.sol
│  │     │  │  │  ├─ IERC20Permit.sol
│  │     │  │  │  └─ draft-ERC20TemporaryApproval.sol
│  │     │  │  └─ utils
│  │     │  │     ├─ ERC1363Utils.sol
│  │     │  │     └─ SafeERC20.sol
│  │     │  ├─ ERC721
│  │     │  │  ├─ ERC721.sol
│  │     │  │  ├─ IERC721.sol
│  │     │  │  ├─ IERC721Receiver.sol
│  │     │  │  ├─ extensions
│  │     │  │  │  ├─ ERC721Burnable.sol
│  │     │  │  │  ├─ ERC721Consecutive.sol
│  │     │  │  │  ├─ ERC721Enumerable.sol
│  │     │  │  │  ├─ ERC721Pausable.sol
│  │     │  │  │  ├─ ERC721Royalty.sol
│  │     │  │  │  ├─ ERC721URIStorage.sol
│  │     │  │  │  ├─ ERC721Votes.sol
│  │     │  │  │  ├─ ERC721Wrapper.sol
│  │     │  │  │  ├─ IERC721Enumerable.sol
│  │     │  │  │  └─ IERC721Metadata.sol
│  │     │  │  └─ utils
│  │     │  │     ├─ ERC721Holder.sol
│  │     │  │     └─ ERC721Utils.sol
│  │     │  └─ common
│  │     │     └─ ERC2981.sol
│  │     ├─ utils
│  │     │  ├─ Address.sol
│  │     │  ├─ Arrays.sol
│  │     │  ├─ Base64.sol
│  │     │  ├─ Comparators.sol
│  │     │  ├─ Context.sol
│  │     │  ├─ Create2.sol
│  │     │  ├─ Errors.sol
│  │     │  ├─ Multicall.sol
│  │     │  ├─ Nonces.sol
│  │     │  ├─ Packing.sol
│  │     │  ├─ Panic.sol
│  │     │  ├─ Pausable.sol
│  │     │  ├─ ReentrancyGuard.sol
│  │     │  ├─ ReentrancyGuardTransient.sol
│  │     │  ├─ ShortStrings.sol
│  │     │  ├─ SlotDerivation.sol
│  │     │  ├─ StorageSlot.sol
│  │     │  ├─ Strings.sol
│  │     │  ├─ TransientSlot.sol
│  │     │  ├─ cryptography
│  │     │  │  ├─ ECDSA.sol
│  │     │  │  ├─ EIP712.sol
│  │     │  │  ├─ Hashes.sol
│  │     │  │  ├─ MerkleProof.sol
│  │     │  │  ├─ MessageHashUtils.sol
│  │     │  │  ├─ P256.sol
│  │     │  │  ├─ RSA.sol
│  │     │  │  └─ SignatureChecker.sol
│  │     │  ├─ introspection
│  │     │  │  ├─ ERC165.sol
│  │     │  │  ├─ ERC165Checker.sol
│  │     │  │  └─ IERC165.sol
│  │     │  ├─ math
│  │     │  │  ├─ Math.sol
│  │     │  │  ├─ SafeCast.sol
│  │     │  │  └─ SignedMath.sol
│  │     │  ├─ structs
│  │     │  │  ├─ BitMaps.sol
│  │     │  │  ├─ Checkpoints.sol
│  │     │  │  ├─ CircularBuffer.sol
│  │     │  │  ├─ DoubleEndedQueue.sol
│  │     │  │  ├─ EnumerableMap.sol
│  │     │  │  ├─ EnumerableSet.sol
│  │     │  │  ├─ Heap.sol
│  │     │  │  └─ MerkleTree.sol
│  │     │  └─ types
│  │     │     └─ Time.sol
│  │     └─ vendor
│  │        └─ compound
│  │           └─ ICompoundTimelock.sol
│  ├─ README.md
│  ├─ broadcast
│  │  └─ DeployPolygon.s.sol
│  │     └─ 137
│  │        ├─ run-1734792777.json
│  │        └─ run-latest.json
│  ├─ cache
│  │  ├─ DeployPolygon.s.sol
│  │  │  └─ 137
│  │  │     ├─ run-1734792777.json
│  │  │     └─ run-latest.json
│  │  └─ solidity-files-cache.json
│  ├─ contracts
│  │  ├─ Pricing.sol
│  │  └─ TimeCapsule.sol
│  ├─ foundry.toml
│  ├─ lib
│  │  ├─ forge-std
│  │  └─ openzeppelin-contracts
│  ├─ out
│  │  ├─ Base.sol
│  │  │  ├─ CommonBase.json
│  │  │  ├─ ScriptBase.json
│  │  │  └─ TestBase.json
│  │  ├─ Context.sol
│  │  │  └─ Context.json
│  │  ├─ Counter.sol
│  │  │  └─ Counter.json
│  │  ├─ DeployPolygon.s.sol
│  │  │  └─ DeployPolygon.json
│  │  ├─ ERC20
│  │  │  └─ IERC20.sol
│  │  │     └─ IERC20.json
│  │  ├─ ERC20.sol
│  │  │  └─ ERC20.json
│  │  ├─ IERC165.sol
│  │  │  └─ IERC165.json
│  │  ├─ IERC20.sol
│  │  │  └─ IERC20.json
│  │  ├─ IERC20Metadata.sol
│  │  │  └─ IERC20Metadata.json
│  │  ├─ IERC721.sol
│  │  │  ├─ IERC721.json
│  │  │  ├─ IERC721Enumerable.json
│  │  │  ├─ IERC721Metadata.json
│  │  │  └─ IERC721TokenReceiver.json
│  │  ├─ IMulticall3.sol
│  │  │  └─ IMulticall3.json
│  │  ├─ MockERC20.sol
│  │  │  └─ MockERC20.json
│  │  ├─ MockERC721.sol
│  │  │  └─ MockERC721.json
│  │  ├─ Ownable.sol
│  │  │  └─ Ownable.json
│  │  ├─ Pricing.sol
│  │  │  └─ Pricing.json
│  │  ├─ Pricing.t.sol
│  │  │  └─ PricingTest.json
│  │  ├─ ReentrancyGuard.sol
│  │  │  └─ ReentrancyGuard.json
│  │  ├─ Script.sol
│  │  │  └─ Script.json
│  │  ├─ StdAssertions.sol
│  │  │  └─ StdAssertions.json
│  │  ├─ StdChains.sol
│  │  │  └─ StdChains.json.backup
│  │  ├─ StdCheats.sol
│  │  │  ├─ StdCheats.json
│  │  │  └─ StdCheatsSafe.json
│  │  ├─ StdError.sol
│  │  │  └─ stdError.json
│  │  ├─ StdInvariant.sol
│  │  │  └─ StdInvariant.json
│  │  ├─ StdJson.sol
│  │  │  └─ stdJson.json
│  │  ├─ StdMath.sol
│  │  │  └─ stdMath.json
│  │  ├─ StdStorage.sol
│  │  │  ├─ stdStorage.json
│  │  │  └─ stdStorageSafe.json
│  │  ├─ StdStyle.sol
│  │  │  └─ StdStyle.json
│  │  ├─ StdToml.sol
│  │  │  └─ stdToml.json
│  │  ├─ StdUtils.sol
│  │  │  └─ StdUtils.json
│  │  ├─ Test.sol
│  │  │  └─ Test.json
│  │  ├─ TimeCapsule.sol
│  │  │  └─ TimeCapsule.json
│  │  ├─ TimeCapsule.t.sol
│  │  │  └─ TimeCapsuleTest.json
│  │  ├─ Vm.sol
│  │  │  ├─ Vm.json
│  │  │  └─ VmSafe.json
│  │  ├─ build-info
│  │  │  ├─ 1e8c596c9fdb6b8457b36fa5748d2566.json
│  │  │  ├─ 346f94f1a1c2d1bc5f54a695761d9aa1.json
│  │  │  ├─ 78724d76f832c48e733d1bf861d47590.json
│  │  │  ├─ b7a4190711c5a777866088066a9ddab6.json
│  │  │  ├─ d42ade8deabe71a6044b510ccf7c4bc3.json
│  │  │  ├─ da1b45cf56ca40df37da02158cf62b3d.json
│  │  │  └─ ea73f7105bf59029d9c075cebf513920.json
│  │  ├─ console.sol
│  │  │  └─ console.json
│  │  ├─ console2.sol
│  │  │  └─ console2.json
│  │  ├─ mocks
│  │  │  └─ MockERC20.sol
│  │  │     └─ MockERC20.json
│  │  └─ safeconsole.sol
│  │     └─ safeconsole.json
│  ├─ remappings.txt
│  ├─ script
│  │  └─ DeployPolygon.s.sol
│  ├─ scripts
│  │  ├─ deploy-pricing.js
│  │  └─ deploy.js
│  ├─ test
│  │  ├─ Pricing.t.sol
│  │  ├─ TimeCapsule.t.sol
│  │  └─ mocks
│  │     └─ MockERC20.sol
│  └─ utils
│     └─ vault-config.js
├─ frontend
│  ├─ .DS_Store
│  ├─ .fleek.json
│  ├─ .npmrc
│  ├─ README.md
│  ├─ __mocks__
│  │  ├─ connectkit.tsx
│  │  └─ wagmi.ts
│  ├─ app
│  │  ├─ ClientLayout.tsx
│  │  ├─ __tests__
│  │  │  ├─ create.test.tsx
│  │  │  └─ explore.test.tsx
│  │  ├─ components
│  │  │  ├─ AddNetwork.tsx
│  │  │  ├─ ConnectButton.tsx
│  │  │  ├─ FileUploadInfo.tsx
│  │  │  ├─ FloatingParticles.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ NotificationBell.tsx
│  │  │  ├─ NotificationSystem.tsx
│  │  │  ├─ NotificationTest.tsx
│  │  │  ├─ WalletConnect.tsx
│  │  │  ├─ WalletInfo.tsx
│  │  │  └─ instructionsComponent
│  │  │     └─ navigation
│  │  │        ├─ footer.tsx
│  │  │        ├─ index.tsx
│  │  │        └─ navbar.tsx
│  │  ├─ config
│  │  │  ├─ accountKit.ts
│  │  │  └─ wagmi.ts
│  │  ├─ create
│  │  │  └─ page.tsx
│  │  ├─ explore
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.server.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.module.css
│  │  ├─ page.tsx
│  │  ├─ pricing
│  │  │  └─ page.tsx
│  │  ├─ providers
│  │  │  └─ AccountKitProvider.tsx
│  │  └─ types
│  │     └─ capsule.ts
│  ├─ config.js
│  ├─ contracts
│  │  └─ TimeCapsuleABI.ts
│  ├─ jest.config.js
│  ├─ jest.setup.js
│  ├─ next-env.d.ts
│  ├─ next.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ next.svg
│  │  └─ vercel.svg
│  ├─ tailwind.config.js
│  ├─ tsconfig.json
│  └─ utils
│     └─ pinata.ts
├─ package-lock.json
└─ package.json

```