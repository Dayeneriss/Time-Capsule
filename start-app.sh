#!/bin/bash

# Démarrer l'application avec les secrets de HCP Vault
hcp vault-secrets run --app timecapsule1 -- npm run dev
