# 🎨 Frontend Administrateur E-commerce (GameXpress)

## 🚀 Introduction
Ce projet est la **version V1 du back-office** de GameXpress, un tableau de bord administrateur permettant la gestion des produits, des images et des catégories.
Il est développé avec **React.js** pour une expérience utilisateur fluide et réactive.

## 🛠️ Technologies Utilisées
- **Framework Frontend** : React.js
- **UI Library** : Tailwind / bootstrap  CSS
- **Gestion d'état** : UseContext
- **Authentification** : Laravel Sanctum (via API Backend)
- **Requêtes API** : "-- Axios --"
- **Routing** : React Router
- **Gestion des notifications** : "-- React Toastify --"

---

## 📐 Architecture
Le projet suit une **architecture modulaire** avec une séparation des **composants, pages et services API**.


## 🔑 Gestion de l'Authentification
L'authentification est gérée via **Laravel Sanctum** en interagissant avec l'API Backend. Les utilisateurs doivent être connectés pour accéder au back-office.

### 🔹 Fonctionnalités
- **Connexion** via `POST /api/v1/admin/login` `POST /api/v1/admin/register`
- **Déconnexion** via `POST /api/v1/admin/logout`
- **Stockage du token** dans `localStorage`


## 📊 Dashboard Administrateur
Le **tableau de bord** affiche les statistiques principales :
- Nombre de produits
- Nombre de catégories
- Nombre d'utilisateurs 
- Graphiques interactifs (Recharts.js) (bonus)

---

## 🛍️ Gestion des Produits
**Endpoints utilisés** :
- 📜 **Lister** : `GET /api/v1/admin/products`
- ➕ **Créer** : `POST /api/v1/admin/products`
- ✏️ **Modifier** : `PUT /api/v1/admin/products/{id}`
- ❌ **Supprimer** : `DELETE /api/v1/admin/products/{id}`

### 🔹 Fonctionnalités
- Affichage en **tableau dynamique**
- Formulaire de **création & modification**
- Upload **d'images produits**
- Suppression avec **confirmation modale**

---

## 🗂️ Gestion des Catégories
**Endpoints utilisés** :
- 📜 **Lister** : `GET /api/v1/admin/categories`
- ➕ **Créer** : `POST /api/v1/admin/categories`
- ✏️ **Modifier** : `PUT /api/v1/admin/categories/{id}`
- ❌ **Supprimer** : `DELETE /api/v1/admin/categories/{id}`

### 🔹 Fonctionnalités
- Affichage en **tableau**
- Création/modification **avec validation**
- **Gestion des sous-catégories**

---

## 🖼️ Gestion des Images Produits
- Upload d'images  **  -- React Dropzone --**
- **Prévisualisation des images**
- Gestion et Suppression d'images via **API**
- Gestion de l'**image principale** d'un produit

---

## 🔥 Notifications & Feedbacks
- **React Toastify** pour afficher les succès/erreurs
- **Loader visuel** lors des requêtes API
- **Gestion des erreurs avec Axios Interceptors**

---

## 📅 Planning de Développement (Semaine 1)

### 📆 **Jour 1**
✅ Initialisation du projet React.js

✅ Configuration de **Tailwind CSS & React Router**

✅ Mise en place du **système d'authentification** (Register , Login, Logout)

### 📆 **Jour 2**

✅ Implémentation d'authentification  **UseContext**

✅ Développement du **Dashboard Administrateur**

### 📆 **Jour 3**

✅ Création du **module Produits** (CRUD + Images)

✅ Intégration de Validation  -- Yup --

### 📆 **Jour 4**

✅ Création du **module Catégories** (CRUD + sous-category)

✅ Intégration de Validation  -- Yup --

### 📆 **Jour 5**

✅ Intégration des **notifications & feedbacks**

✅ Notifications en temps  réel & optimisations

---

## 🚀 Déploiement (optionel)
Le projet sera hébergé sur **Vercel** ou **Netlify** après validation de la V1.

### 📤 Étapes
1. `npm run build`
2. Déploiement via GitHub Actions ou Vercel
3. Configuration du `.env` pour les variables d'API

---


# 🎨 Frontend Administrateur & Client – GameXpress (V2)

## 🚀 Introduction  
Cette version V2 du frontend GameXpress introduit la **gestion avancée du panier**, le **rôle utilisateur**, la **fusion des paniers**, le **calcul dynamique des totaux (TVA, remises)** et bien plus encore.  
Elle est conçue pour offrir une **expérience fluide aux clients** connectés et invités, tout en permettant une **administration fine des rôles** via une interface dédiée.

---

## 🛠️ Technologies Utilisées
- **Framework Frontend** : React.js  
- **State Management** : `useContext`
- **Requêtes API** : Axios  
- **Routing** : React Router Dom  
- **Authentification** : Laravel Sanctum (via API backend)  
- **Notifications** : React Toastify  
- **Upload** :  ++ React Dropzone  ++
- **Form Validation** : ++ Yup + Formik ++
- **Graphiques** : Recharts.js (bonus)

---

## 🛒 Gestion du Panier (Nouveauté V2)

### 🔹 Fonctionnalités
- **Ajout au panier** (connecté ou invité)
- **Mise à jour des quantités**
- **Suppression d’article**
- **Fusion automatique du panier après login**
- **Panier persistant en base pour les utilisateurs connectés**
- **Calcul total (TVA, remises)**
- **Expiration automatique après 48h d’inactivité**

### 🧠 Comportement UX
| Statut | Stockage Panier |  
|--------|------------------|  
| 🧑‍🚀 Invité | `localStorage` / session |  
| 👤 Connecté | Base de données via API |

> Lorsqu’un invité se connecte, les deux paniers sont **fusionnés automatiquement**.

---

## 🔐 Gestion des Rôles et Permissions (Bonus V2)
### 🔹 Fonctionnalités côté frontend :
- Attribution de rôle via interface admin (si autorisé)
- Affichage conditionnel des boutons/options selon rôle :
  - `Client` : accès au panier uniquement
  - `Manager` : accès aux commandes
  - `Admin` : accès total (utilisateurs, rôles, produits...)

---



## 🧾 Gestion du Panier – Détails API utilisés

| Action | Méthode | Endpoint |
|--------|---------|----------|
| Ajouter produit | `POST` | `/api/v2/cart/add` |
| Modifier quantité | `PUT` | `/api/v2/cart/update/{id}` |
| Supprimer produit | `DELETE` | `/api/v2/cart/remove/{id}` |
| Voir panier | `GET` | `/api/v2/cart` |
| Fusion panier après login | `POST` | `/api/v2/cart/merge` |

---

## 💰 Calcul du Total & Remises

- Calculs dynamiques côté frontend en interaction avec le backend
- Résumé affiché dans la page "Panier" :
  - Sous-total
  - TVA (20% par défaut)
  - Remises appliquées
  - **Total TTC**

---

## 🧪 Validation & Expériences Utilisateur

- ✅ Feedback visuel via **React Toastify**
- ✅ **Loader** sur chaque action async
- ✅ **Formulaires validés** avec **Yup**
- ✅ Gestion des erreurs : Axios Interceptors + Catch centralisé

---


## 🗓️ **Planning de Développement – Frontend V2 (10 jours)**

| **Jour** | **Tâches principales** |  
|----------|------------------------|  
| **Jour 1 🛠️** | 🔧 Mise en place des composants de base du **panier** (CardProduit, PanierSidebar, RésuméCommande) <br>🧩 Implémentation du **stockage local** pour les invités (localStorage/sessionStorage) |  
| **Jour 2 🔄** | 👥 Création du **contexte Panier** (`CartContext`) <br>🔐 Liaison avec l’authentification : détection **invité vs connecté** |  
| **Jour 3 📦** | ➕ Ajout des actions panier (ajouter, modifier, supprimer) <br>🔄 Gestion dynamique des quantités (avec contrôle stock) |  
| **Jour 4 🧠** | 🔗 Détection de connexion et **fusion automatique** entre panier local et DB (via API `/cart/merge`) <br>🔒 Implémentation des **règles de rôles UI** (`Client`, `Manager`, `Admin`) |  
| **Jour 5 💰** | 🧮 Calcul **automatique du total TTC**, TVA, remises <br>📋 Affichage du récapitulatif clair avant validation (CheckoutPreview) |  
| **Jour 6 ✅** | 🧪 Mise en place des **tests visuels** et validation de chaque action panier <br>🎯 UX : gestion des erreurs, loader sur actions async |  
| **Jour 7 🔔** | 📢 Intégration de **React Toastify** pour les feedbacks (succès, erreurs) <br>💡 Affichage de messages spécifiques selon cas (ex : stock insuffisant) |  
| **Jour 8 🧼** | ⏳ Mise en place de la **logique d’expiration automatique** des articles du panier (48h) avec `setTimeout` ou date-check |  
| **Jour 9 🔄** | 🧱 Refactor du code : découpage logique, nettoyage, séparation UI & logique <br>📁 Organisation finale des fichiers & contextes |  
| **Jour 10 🚀** | ✅ Vérification complète de tous les flows (invité -> connecté, fusion, checkout) <br>🌐 Préparation au déploiement (`npm run build`, config `.env`) |

---

### 🎁 **Livrables attendus en fin de sprint**
- ✅ Panier fonctionnel avec toutes les règles métiers
- ✅ Contexte global robuste (`CartContext`, `AuthContext`)
- ✅ UI fluide, testée, et sécurisée selon les rôles
- ✅ Système d’expiration et de fusion au point
- ✅ Projet prêt à être **déployé sur Vercel ou Netlify**


## 🚀 Déploiement (optionnel)

- Hébergement via **Vercel**, **Netlify** ou **GitHub Pages**

---

## ✅ Bonus / Améliorations futures
- 🔐 Auth via **OAuth (Google/Facebook)**  
- 💳 Intégration **Stripe** pour le paiement  
- 🔄 Mise en **cache du panier** pour performance offline  
- 🔔 Notifications en temps réel (WebSocket)

---