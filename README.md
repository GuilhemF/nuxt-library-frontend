# Nuxt Library Frontend

Bienvenue sur le dépôt de notre frontend [Nuxt 4](https://nuxt.com/) avec Tailwind. Ce document vous guidera pour lancer le projet en local.

## Prérequis

Node v22.12.0

## Installation

1.  **Clonez le dépôt** :

    ```bash
    git clone https://github.com/GuilhemF/nuxt-library-frontend votre-depot-front
    cd votre-depot-front
    ```

2.  **Installez les dépendances Nodes** :

    ```bash
    npm install
    ```

3.  **Créer le fichier `.env`** :

    ```bash
    touch .env
    ```

4.  **Ajoutez la ligne suivante au fichier `.env` pour spécifier l'URL de votre API backend :** :

    ```bash
    NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
    ```

## Lancement du serveur

Pour démarrer, utilisez la commande suivante :

```bash
npm run dev
```
