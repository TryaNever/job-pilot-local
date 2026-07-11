# Architecture du frontend

## app/

Contient les routes Next.js (App Router).

## components/

Composants réutilisables.

- ui/ : composants génériques
- layout/ : Header, Footer, Sidebar
- common/ : composants métier partagés

## features/

Chaque fonctionnalité métier est isolée.

Exemple :

features/
└── auth/
├── components/
├── hooks/
├── services/
└── types/

## lib/

Code partagé :

- client API
- configuration
- helpers

## services/

Communication avec le backend.

## hooks/

Hooks React réutilisables.

## types/

Types TypeScript globaux.

## utils/

Fonctions utilitaires pures.
