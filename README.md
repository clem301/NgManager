# NG Manager

Plateforme complète de gestion multi-pays avec authentification, rôles hiérarchiques et panneau d'administration.

## Design "Warm Minimal"

Le design a été entièrement repensé avec un style lumineux, chaleureux et moderne.

### Palette de couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Crème | `#FEFBF6` | Fond principal |
| Sable | `#F4F1DE` | Fond secondaire |
| Encre | `#1a1a2e` | Texte principal |
| Terracotta | `#E07A5F` | Accent principal |
| Sauge | `#81B29A` | Accent secondaire |
| Ardoise | `#3D5A80` | Accent tertiaire |

### Typographie

- **Inter** : Police principale (corps de texte)
- **Playfair Display** : Titres (display)

### Principes de design

- Fond clair avec surfaces blanches
- Ombres douces et naturelles
- Bordures subtiles et visibles
- Coins arrondis doux (12px)
- Pas de glassmorphisme excessif
- Style éditorial moderne

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Base de données locale (Supabase)

```bash
# Démarrer Supabase local
npx supabase start

# Voir le statut
npx supabase status

# Arrêter Supabase
npx supabase stop
```

Accès aux outils :
- **Application** : http://localhost:3000
- **Supabase Studio** : http://127.0.0.1:54323
- **Mailpit** (emails de test) : http://127.0.0.1:54324

## Structure du projet

```
ngmanager/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── login/             # Connexion
│   ├── signup/            # Inscription
│   ├── dashboard/         # Dashboard (redirection)
│   ├── countries/         # Gestion des pays
│   │   ├── page.tsx       # Liste des pays
│   │   ├── create/        # Créer un pays
│   │   └── [id]/          # Page d'un pays
│   ├── admin/             # Administration
│   └── profile/           # Profil utilisateur
├── components/
│   ├── ui/                # Composants UI
│   │   ├── GlassCard.tsx  # Cartes avec ombres douces
│   │   ├── GlassButton.tsx# Boutons stylisés
│   │   ├── GlassInput.tsx # Champs de saisie
│   │   └── Badge.tsx      # Badges de rôles
│   └── layout/
│       ├── Header.tsx     # En-tête
│       └── Sidebar.tsx    # Barre latérale
├── contexts/
│   └── AuthContext.tsx    # Gestion de l'authentification
├── lib/
│   ├── auth.ts            # Fonctions d'authentification
│   ├── supabase.ts        # Client Supabase
│   ├── countries.ts       # Gestion des pays
│   ├── bunkers.ts         # Gestion des bunkers
│   └── roles.ts           # Définition des rôles
└── supabase/              # Schémas SQL
```

## Composants UI

### Card (GlassCard)

```tsx
<GlassCard elevated hover padding="lg">
  {children}
</GlassCard>
```

### Button (GlassButton)

```tsx
<GlassButton variant="primary" size="lg" fullWidth>
  Texte
</GlassButton>
```

Variantes : `primary`, `secondary`, `ghost`, `danger`

### Input (GlassInput)

```tsx
<GlassInput
  label="Email"
  type="email"
  placeholder="votre@email.com"
  hint="Entrez votre email"
  error="Email invalide"
/>
```

### Badge

```tsx
<Badge variant="president" dot>
  Président
</Badge>
```

Variantes : `default`, `president`, `admin`, `member`, `staff`, `owner`, `success`, `warning`, `error`

## Classes Tailwind personnalisées

- `bg-cream` - Fond crème principal
- `bg-sand` - Fond sable secondaire
- `text-ink` - Texte principal
- `text-ink-light` - Texte secondaire
- `text-ink-muted` - Texte discret
- `text-terracotta` - Accent terracotta
- `text-sage` - Accent sauge
- `text-slate` - Accent ardoise
- `surface` - Surface blanche avec bordure
- `surface-elevated` - Surface avec ombre
- `surface-hover` - Surface avec effet hover

## Technologies

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Supabase** - Backend & Base de données
- **Inter & Playfair Display** - Typographie
