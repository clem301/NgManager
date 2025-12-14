# NG Manager

Plateforme complète de gestion multi-pays avec authentification, rôles hiérarchiques et panneau d'administration.

## 🎨 Design

- **Thème**: Noir profond avec glassmorphisme subtil
- **Style**: Moderne, futuriste, épuré
- **Police**: Exo 2
- **Effets**: Glassmorphisme, glow effects, animations fluides

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
ngmanager/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── login/             # Connexion
│   ├── register/          # Inscription
│   ├── dashboard/         # Dashboard pays
│   ├── creations/         # Gestion créations
│   ├── demandes/          # Gestion demandes
│   ├── historique/        # Timeline du pays
│   ├── messagerie/        # Messagerie interne
│   ├── forums/            # Forums du pays
│   ├── profil/            # Profil utilisateur
│   ├── staff/             # Zone Staff (lecture seule)
│   └── proprietaire/      # Panneau Propriétaire
├── components/
│   ├── ui/                # Composants UI réutilisables
│   │   ├── GlassCard.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassInput.tsx
│   │   └── Badge.tsx
│   └── layout/            # Composants de layout
│       ├── Header.tsx
│       └── Sidebar.tsx
└── public/                # Assets statiques
```

## 🎯 Pages disponibles

### Pages publiques
- **/** - Page d'accueil avec statistiques et pays disponibles
- **/login** - Connexion
- **/register** - Inscription (avec validation admin)

### Pages utilisateur
- **/dashboard** - Vue d'ensemble du pays
- **/creations** - Soumission et validation de créations
- **/demandes** - Gestion des demandes de ressources/aide
- **/historique** - Timeline complète des actions
- **/messagerie** - Boîte aux lettres interne
- **/forums** - Discussions du pays
- **/profil** - Profil utilisateur avec badges et statistiques

### Pages administration
- **/staff** - Zone Staff (logs globaux en lecture seule)
- **/proprietaire** - Panneau Propriétaire (gestion globale)

## 🎨 Composants UI

### GlassCard
Carte avec effet glassmorphisme
```tsx
<GlassCard hover strong>
  {children}
</GlassCard>
```

### GlassButton
Bouton stylisé avec variantes
```tsx
<GlassButton variant="primary|secondary|danger">
  Texte
</GlassButton>
```

### GlassInput
Champ de saisie avec effet verre
```tsx
<GlassInput
  label="Titre"
  placeholder="Texte..."
  required
/>
```

### Badge
Badge avec variantes de rôles
```tsx
<Badge variant="president|admin|member|staff|owner" glow>
  Texte
</Badge>
```

## 🎨 Classes Tailwind personnalisées

- `.glass` - Effet glassmorphisme standard
- `.glass-strong` - Glassmorphisme plus prononcé
- `.glass-hover` - Effet hover avec glow
- `.gradient-text` - Texte avec dégradé
- `.text-glow` - Effet lumineux sur le texte
- `.animate-float` - Animation flottante
- `.animate-glow` - Animation de pulsation lumineuse

## ⚠️ Note importante

**Ceci est une maquette visuelle uniquement.**

Toutes les données affichées sont mockées (fausses données pour la démonstration).
Aucune fonctionnalité backend n'est implémentée.

## 📝 Prochaines étapes

Pour implémenter les fonctionnalités :
1. Setup Prisma avec SQLite
2. Créer les modèles de données
3. Implémenter NextAuth.js
4. Créer les API routes
5. Connecter les composants aux données réelles
6. Implémenter la validation admin
7. Ajouter le système de notifications email
8. Implémenter les sauvegardes automatiques

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **React** - Interface utilisateur
