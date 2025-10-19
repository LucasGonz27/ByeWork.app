# ByeWork.app

**Plateforme de recherche d'emploi moderne et intuitive**

ByeWork.app est une application web full-stack qui connecte les candidats aux entreprises, offrant une expérience utilisateur fluide pour la recherche d'emploi et la gestion des offres.

## Fonctionnalités

### **Pour les Candidats**
- **Recherche d'emplois** : Filtrage avancé par mots-clés, localisation, type de contrat
- **Gestion de profil** : Création et mise à jour du profil candidat
- **Candidatures** : Postulation facile aux offres d'emploi
- **Notifications** : Système de notifications en temps réel

### **Pour les Entreprises**
- **Tableau de bord** : Gestion des offres et candidatures
- **Publication d'offres** : Création d'annonces détaillées
- **Gestion des candidats** : Suivi des candidatures
- **Statistiques** : Analytics des performances

### **Administration**
- **Panel admin** : Gestion globale de la plateforme
- **Modération** : Validation des contenus
- **Analytics** : Statistiques détaillées

## **Technologies**

### **Frontend**
- **React 18** - Interface utilisateur moderne
- **CSS Modules** - Styling modulaire et maintenable
- **Vite** - Build tool ultra-rapide
- **React Router** - Navigation côté client
- **Responsive Design** - Compatible mobile/desktop

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Base de données** - Stockage des données
- **JWT** - Authentification sécurisée
- **Middleware** - Sécurité et validation

### **Sécurité**
- **Authentification JWT** - Tokens sécurisés
- **Rate Limiting** - Protection contre les abus
- **CORS** - Configuration sécurisée
- **Logging** - Traçabilité des actions

## **Installation**

### **Prérequis**
- Node.js (v16 ou supérieur)
- npm ou yarn
- Git

### **1. Cloner le projet**
```bash
git clone https://github.com/votre-username/ByeWork.app.git
cd ByeWork.app
```

### **2. Installation des dépendances**

**Backend :**
```bash
cd backend
npm install
```

**Frontend :**
```bash
cd frontend
npm install
```

### **3. Configuration**

**Variables d'environnement (backend/.env) :**
```env
PORT=5000
JWT_SECRET=votre_secret_jwt_ici
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=byework_db
```

### **4. Lancement**

**Démarrer le backend :**
```bash
cd backend
npm start
```

**Démarrer le frontend :**
```bash
cd frontend
npm run dev
```

L'application sera accessible sur :
- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:5000

## 📁 **Structure du projet**

```
ByeWork.app/
├── 📁 backend/
│   ├── 📁 api/                 # Routes API
│   │   ├── 📁 admin/          # Routes administrateur
│   │   ├── 📁 candidature/    # Routes candidatures
│   │   ├── 📁 entreprise/     # Routes entreprises
│   │   ├── 📁 offre/          # Routes offres
│   │   └── 📁 utilisateurs/   # Routes utilisateurs
│   ├── 📁 config/             # Configuration
│   ├── 📁 middleware/         # Middlewares de sécurité
│   ├── 📁 models/             # Modèles de données
│   └── 📄 server.js           # Serveur principal
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/     # Composants réutilisables
│   │   ├── 📁 pages/          # Pages de l'application
│   │   ├── 📁 contexts/       # Contextes React
│   │   ├── 📁 hooks/          # Hooks personnalisés
│   │   └── 📁 utils/          # Utilitaires
│   └── 📁 public/              # Assets statiques
└── 📄 README.md
```

## 🔧 **API**

### **Authentification**
- `POST /ApiByeWork/utilisateurs/login` - Connexion
- `POST /ApiByeWork/utilisateurs/register` - Inscription
- `GET /ApiByeWork/utilisateurs/profile` - Profil utilisateur

### **Offres d'emploi**
- `GET /ApiByeWork/offres` - Liste des offres
- `GET /ApiByeWork/offres/:id` - Détails d'une offre
- `POST /ApiByeWork/offres` - Créer une offre (entreprise)

### **Entreprises**
- `GET /ApiByeWork/entreprises` - Liste des entreprises
- `GET /ApiByeWork/entreprises/:id` - Détails d'une entreprise
- `POST /ApiByeWork/entreprises` - Créer une entreprise

### **Candidatures**
- `POST /ApiByeWork/candidatures` - Postuler à une offre
- `GET /ApiByeWork/candidatures` - Mes candidatures


### **Pages principales**
- **Accueil** - Présentation de la plateforme
- **Recherche d'emplois** - Filtrage et recherche
- **Entreprises** - Annuaire des entreprises
- **Profil** - Gestion du profil utilisateur
- **Publier une offre** - Création d'annonces (entreprises)

## **Sécurité**

- **Authentification JWT** : Tokens sécurisés pour l'authentification
- **Rate Limiting** : Protection contre les attaques par déni de service
- **CORS** : Configuration sécurisée des origines
- **Validation** : Validation des données côté serveur
- **Logging** : Traçabilité des actions utilisateur





---

**ByeWork.app** - *Trouvez votre emploi idéal, trouvez votre équipe parfaite* 🚀
