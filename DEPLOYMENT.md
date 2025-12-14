# 🚀 Guide de déploiement - Debian 12 + GitHub + DuckDNS

Ce guide vous explique comment déployer NG Manager sur un serveur Debian 12, avec déploiement automatique via GitHub et nom de domaine DuckDNS.

---

## 📋 Prérequis

- Serveur Debian 12 sur Proxmox
- Accès SSH au serveur
- Compte GitHub
- Compte DuckDNS (gratuit)

---

## 1️⃣ Configuration du serveur Debian 12

### Connexion SSH au serveur

```bash
ssh root@VOTRE_IP_SERVEUR
```

### Installation des dépendances

```bash
# Mise à jour du système
apt update && apt upgrade -y

# Installation de Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Installation de Git
apt install -y git

# Installation de Nginx (serveur web reverse proxy)
apt install -y nginx

# Installation de PM2 (gestionnaire de processus Node.js)
npm install -g pm2

# Vérification des installations
node -v
npm -v
git --version
nginx -v
pm2 -v
```

---

## 2️⃣ Configuration de GitHub

### A. Créer un dépôt GitHub

1. Allez sur [github.com](https://github.com) et créez un nouveau repository
2. Nommez-le `ngmanager` (ou autre nom)
3. **Ne pas** initialiser avec README, .gitignore ou licence

### B. Initialiser Git localement (sur votre PC)

```bash
cd c:\Users\Cleme\Documents\PROJET\NGMANAGER

# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - NG Manager maquette"

# Ajouter le remote GitHub (remplacer par VOTRE url)
git remote add origin https://github.com/VOTRE_USERNAME/ngmanager.git

# Renommer la branche en main
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

### C. Générer une clé SSH sur le serveur

```bash
# Sur le serveur Debian
ssh-keygen -t ed25519 -C "votre-email@example.com"

# Appuyez sur Entrée 3 fois (pas de passphrase pour automatisation)

# Afficher la clé publique
cat ~/.ssh/id_ed25519.pub
```

Copiez cette clé et ajoutez-la dans GitHub :
- GitHub → Settings → SSH and GPG keys → New SSH key
- Collez la clé et sauvegardez

### D. Tester la connexion SSH

```bash
# Sur le serveur
ssh -T git@github.com
# Devrait afficher : "Hi username! You've successfully authenticated..."
```

---

## 3️⃣ Déploiement de l'application sur le serveur

### A. Cloner le dépôt sur le serveur

```bash
# Sur le serveur Debian
cd /var/www
git clone git@github.com:VOTRE_USERNAME/ngmanager.git
cd ngmanager

# Installer les dépendances
npm install

# Build de production
npm run build
```

### B. Démarrer l'application avec PM2

```bash
# Créer le fichier de configuration PM2
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'ngmanager',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/ngmanager',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Démarrer l'application
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup

# Vérifier que l'app tourne
pm2 status
pm2 logs ngmanager
```

---

## 4️⃣ Configuration DuckDNS

### A. Créer un nom de domaine sur DuckDNS

1. Allez sur [duckdns.org](https://www.duckdns.org)
2. Connectez-vous (Google, GitHub, etc.)
3. Créez un sous-domaine (ex: `ngmanager.duckdns.org`)
4. Notez votre **token** DuckDNS

### B. Installer le client DuckDNS sur le serveur

```bash
# Créer un dossier pour DuckDNS
mkdir -p /root/duckdns
cd /root/duckdns

# Créer le script de mise à jour
cat > duck.sh << 'EOF'
#!/bin/bash
echo url="https://www.duckdns.org/update?domains=VOTRE_DOMAINE&token=VOTRE_TOKEN&ip=" | curl -k -o /root/duckdns/duck.log -K -
EOF

# IMPORTANT: Remplacer VOTRE_DOMAINE et VOTRE_TOKEN dans le fichier
nano duck.sh
# Exemple: domains=ngmanager&token=abc123...

# Rendre le script exécutable
chmod 700 duck.sh

# Tester le script
./duck.sh
cat duck.log
# Devrait afficher "OK"

# Ajouter au crontab pour mise à jour toutes les 5 minutes
crontab -e
# Ajouter cette ligne :
*/5 * * * * /root/duckdns/duck.sh >/dev/null 2>&1
```

---

## 5️⃣ Configuration Nginx (Reverse Proxy)

```bash
# Créer la configuration Nginx
cat > /etc/nginx/sites-available/ngmanager << 'EOF'
server {
    listen 80;
    server_name VOTRE_DOMAINE.duckdns.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Remplacer VOTRE_DOMAINE par votre nom DuckDNS
nano /etc/nginx/sites-available/ngmanager

# Activer le site
ln -s /etc/nginx/sites-available/ngmanager /etc/nginx/sites-enabled/

# Tester la configuration
nginx -t

# Redémarrer Nginx
systemctl restart nginx

# Activer Nginx au démarrage
systemctl enable nginx
```

### Installer un certificat SSL avec Certbot (HTTPS)

```bash
# Installer Certbot
apt install -y certbot python3-certbot-nginx

# Obtenir un certificat SSL
certbot --nginx -d VOTRE_DOMAINE.duckdns.org

# Suivre les instructions (entrer votre email, accepter les termes)

# Le certificat sera automatiquement renouvelé
```

---

## 6️⃣ Script de déploiement automatique

### A. Créer un script de déploiement sur le serveur

```bash
# Sur le serveur
cat > /var/www/deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Déploiement NG Manager..."

cd /var/www/ngmanager

# Récupérer les dernières modifications
git pull origin main

# Installer les dépendances (si nouvelles)
npm install

# Build de production
npm run build

# Redémarrer l'application avec PM2
pm2 restart ngmanager

echo "✅ Déploiement terminé !"
EOF

# Rendre exécutable
chmod +x /var/www/deploy.sh
```

### B. Déployer depuis votre PC

Chaque fois que vous voulez déployer :

```bash
# Sur votre PC (Windows)
cd c:\Users\Cleme\Documents\PROJET\NGMANAGER

# Ajouter les modifications
git add .

# Commit
git commit -m "Description des changements"

# Push vers GitHub
git push origin main

# SSH vers le serveur et déployer
ssh root@VOTRE_IP "cd /var/www && ./deploy.sh"
```

### C. Créer un alias pour faciliter le déploiement

Créer un fichier `deploy.bat` dans votre projet :

```batch
@echo off
echo 🚀 Deploiement NG Manager...

git add .
git commit -m "%~1"
git push origin main

ssh root@VOTRE_IP_SERVEUR "cd /var/www && ./deploy.sh"

echo ✅ Deploiement termine !
pause
```

Usage :
```bash
deploy.bat "Mon message de commit"
```

---

## 7️⃣ GitHub Actions (Déploiement automatique - Optionnel)

Pour un déploiement automatique à chaque push sur GitHub :

### A. Créer le workflow GitHub Actions

```bash
# Sur votre PC
mkdir -p .github/workflows
```

Créer le fichier `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Debian Server

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_IP }}
        username: root
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www
          ./deploy.sh
```

### B. Configurer les secrets GitHub

1. Sur GitHub, allez dans votre repo → Settings → Secrets and variables → Actions
2. Ajoutez ces secrets :
   - `SERVER_IP` : L'IP de votre serveur
   - `SSH_PRIVATE_KEY` : Contenu de `/root/.ssh/id_ed25519` (clé privée du serveur)

Maintenant, chaque `git push` déclenchera automatiquement le déploiement ! 🎉

---

## 8️⃣ Commandes utiles

```bash
# Voir les logs de l'application
pm2 logs ngmanager

# Redémarrer l'application
pm2 restart ngmanager

# Arrêter l'application
pm2 stop ngmanager

# Voir le status
pm2 status

# Voir l'utilisation des ressources
pm2 monit

# Redémarrer Nginx
systemctl restart nginx

# Voir les logs Nginx
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

---

## 🎉 Résumé

Votre application est maintenant :
- ✅ Hébergée sur Debian 12
- ✅ Accessible via DuckDNS (https://VOTRE_DOMAINE.duckdns.org)
- ✅ Avec SSL/HTTPS automatique
- ✅ Déployable facilement avec Git
- ✅ Auto-redémarrage avec PM2

**Workflow de développement :**
1. Modifier le code localement
2. `git add . && git commit -m "message"`
3. `git push origin main`
4. SSH vers le serveur et lancer `./deploy.sh`
   OU utiliser le script `deploy.bat`
   OU GitHub Actions le fait automatiquement !
