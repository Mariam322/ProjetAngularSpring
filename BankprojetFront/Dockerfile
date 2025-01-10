FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Copier les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json ./

# Configurer NPM et installer les dépendances avec des délais étendus
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --legacy-peer-deps --timeout=60000

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par Angular
EXPOSE 4200

# Commande pour démarrer l'application Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
