# Utiliser une image officielle Node.js stable
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json ./

# Nettoyer le cache et installer les dépendances
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copier le reste des fichiers du projet dans le conteneur
COPY . .

# Exposer le port par défaut utilisé par Angular
EXPOSE 4200

# Commande pour démarrer le serveur Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
