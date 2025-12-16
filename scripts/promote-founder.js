#!/usr/bin/env node

/**
 * Script sécurisé pour promouvoir un utilisateur en Fondateur
 * Usage: node scripts/promote-founder.js <username>
 */

const fs = require('fs');
const path = require('path');

const username = process.argv[2];

if (!username) {
  console.error('❌ Usage: node scripts/promote-founder.js <username>');
  process.exit(1);
}

// Chemin vers le fichier de données utilisateurs
const dataPath = path.join(__dirname, '..', 'data', 'users.json');

// Créer le dossier data s'il n'existe pas
const dataDir = path.dirname(dataPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Lire ou initialiser les utilisateurs
let users = [];
if (fs.existsSync(dataPath)) {
  const data = fs.readFileSync(dataPath, 'utf-8');
  users = JSON.parse(data);
}

// Trouver l'utilisateur
const userIndex = users.findIndex(u => u.username === username);

if (userIndex === -1) {
  console.error(`❌ Utilisateur "${username}" introuvable`);
  console.log('\n📋 Utilisateurs disponibles:');
  users.forEach(u => console.log(`   - ${u.username} (${u.email})`));
  process.exit(1);
}

// Définir le rôle Fondateur
const FONDATEUR_ROLE = {
  id: 'fondateur',
  name: 'Fondateur',
  level: 100,
  color: '#ff0000',
  emoji: '🔴',
  description: 'Créateur de NG Manager - Accès total'
};

// Promouvoir l'utilisateur
users[userIndex].role = FONDATEUR_ROLE;

// Sauvegarder
fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

console.log(`✅ ${username} est maintenant Fondateur!`);
console.log(`   Email: ${users[userIndex].email}`);
console.log(`   Grade: ${FONDATEUR_ROLE.emoji} ${FONDATEUR_ROLE.name}`);
console.log('\n💡 L\'utilisateur verra les changements à sa prochaine connexion.');
