# 🔄 Workflow Git - Dev & Production

## 🌳 Structure des branches

- **`dev`** : Branche de développement (travail quotidien)
- **`main`** : Branche de production (déploiement automatique sur le serveur)

---

## 📋 Configuration initiale

### 1. Sur votre PC - Créer la branche dev

```bash
cd c:\Users\Cleme\Documents\PROJET\NGMANAGER

# Créer et basculer sur la branche dev
git checkout -b dev

# Push la branche dev sur GitHub
git push -u origin dev

# Retour sur main
git checkout main
```

### 2. Sur GitHub - Configurer les secrets pour le déploiement auto

1. Allez sur votre repo GitHub : https://github.com/clem301/NgManager
2. **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **New repository secret**
4. Ajoutez ces 2 secrets :

#### Secret 1 : `SERVER_IP`
- Name: `SERVER_IP`
- Value: `VOTRE_IP_SERVEUR` (ex: 192.168.1.100)

#### Secret 2 : `SSH_PRIVATE_KEY`
- Name: `SSH_PRIVATE_KEY`
- Value: La clé privée SSH de votre serveur

**Pour obtenir la clé privée sur le serveur :**

```bash
# Sur le serveur Debian (en root)
cat ~/.ssh/id_ed25519
```

Copiez **TOUT** le contenu (y compris les lignes `-----BEGIN` et `-----END`) et collez-le dans le secret.

---

## 🎯 Workflow de développement

### Développement quotidien (branche `dev`)

```bash
# Toujours travailler sur dev
git checkout dev

# Faire vos modifications...
# ...

# Commit et push sur dev
git add .
git commit -m "Ajout nouvelle fonctionnalité"
git push origin dev
```

### Déploiement en production (branche `main`)

Quand vous êtes prêt à déployer en production :

```bash
# 1. S'assurer d'être sur dev avec tous les commits
git checkout dev
git status

# 2. Basculer sur main
git checkout main

# 3. Fusionner dev dans main
git merge dev

# 4. Push vers GitHub (déclenchera le déploiement automatique !)
git push origin main

# 5. Retourner sur dev pour continuer à travailler
git checkout dev
```

**🎉 Automatique :** Dès que vous push sur `main`, GitHub Actions déploiera automatiquement sur votre serveur !

---

## 🚀 Scripts de déploiement rapides

### Script 1 : `dev.bat` - Push sur dev

Créer `dev.bat` dans votre projet :

```batch
@echo off
echo 🔧 Push vers DEV...
git checkout dev
git add .
git commit -m "%~1"
git push origin dev
echo ✅ Push DEV terminé !
pause
```

**Usage :**
```bash
dev.bat "Mon message de commit"
```

### Script 2 : `prod.bat` - Déployer en production

Créer `prod.bat` dans votre projet :

```batch
@echo off
echo.
echo ⚠️  DEPLOIEMENT EN PRODUCTION
echo ========================================
echo.
echo Cette action va :
echo 1. Fusionner dev dans main
echo 2. Déclencher le déploiement automatique
echo.
pause

git checkout dev
git pull origin dev

git checkout main
git pull origin main
git merge dev -m "Merge dev into main for production deployment"

echo.
echo 📤 Push vers GitHub (déploiement auto)...
git push origin main

echo.
echo ✅ Production déployée !
echo 🌐 Le serveur se met à jour automatiquement...
echo.

git checkout dev
pause
```

**Usage :**
```bash
prod.bat
```

---

## 📊 Vérifier le déploiement automatique

### Sur GitHub

1. Allez dans votre repo → **Actions**
2. Vous verrez l'historique des déploiements
3. Cliquez sur un déploiement pour voir les logs en temps réel

### Sur le serveur

```bash
# Voir les logs PM2
pm2 logs ngmanager

# Voir le status
pm2 status

# Voir les derniers commits
cd /var/www/ngmanager
git log --oneline -5
```

---

## 🛠️ Commandes utiles

```bash
# Voir sur quelle branche vous êtes
git branch

# Voir les différences entre dev et main
git diff dev main

# Annuler un merge (si erreur)
git merge --abort

# Forcer le redéploiement (si problème)
git push origin main --force
```

---

## 📝 Exemple de workflow complet

```bash
# Lundi - Développement
git checkout dev
# ... modifications ...
git add .
git commit -m "Ajout page contact"
git push origin dev

# Mardi - Développement
# ... modifications ...
git add .
git commit -m "Fix bug formulaire"
git push origin dev

# Vendredi - Déploiement en production
git checkout main
git merge dev
git push origin main  # 🚀 Déploiement automatique !
git checkout dev
```

---

## 🎯 Résumé

| Action | Branche | Commande | Déploiement auto ? |
|--------|---------|----------|-------------------|
| Développer | `dev` | `git push origin dev` | ❌ Non |
| Déployer en prod | `main` | `git push origin main` | ✅ Oui ! |

**Règle d'or :** Ne **JAMAIS** travailler directement sur `main`, toujours sur `dev` !
