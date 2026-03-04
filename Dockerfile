# Utiliser l'image officielle Nginx (légère et faite pour servir des sites statiques)
FROM nginx:alpine

# Supprimer la configuration de base de Nginx (facultatif mais plus propre)
RUN rm -rf /usr/share/nginx/html/*

# Copier nos fichiers HTML, CSS, JS et autres assets dans le dossier public d'Nginx
COPY . /usr/share/nginx/html/

# Exposer le port par défaut de Nginx (80)
EXPOSE 80

# Démarrer Nginx en arrière-plan
CMD ["nginx", "-g", "daemon off;"]
