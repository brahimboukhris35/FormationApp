=========================================================
APPLICATION : GESTION DE FORMATIONS - EXCLLENT TRAINING
=========================================================

TECHNOLOGIES :
- Frontend : Angular 17 avec Nx Workspace (commandes via mnrv)
- Backend : Spring Boot 3
- Base de données : MySQL

OBJECTIF :
Application complète pour gérer les formations, les domaines, les participants, les formateurs, et les affectations.

INSTALLATION ET LANCEMENT

BACKEND (Spring Boot)
--------------------------
1.  Ouvrir le dossier "backend" dans votre IDE (IntelliJ / Eclipse / VSCode).
2. S'assurer que MySQL est installé et lancé.
3. Modifier le fichier application.properties si besoin.
4. Exécuter dans le dossier backend/formation:
   ./mvnw spring-boot:run 

FRONTEND (Angular + Nx avec mnrv)
-------------------------------------
Pour exécuter le frontend :
1. Ouvrir le dossier "frontend"
2. Exécuter `npm install` ou ' npm install --legacy-peer-deps' pour ignorer les conflits de versions
3. Puis `ng serve`
4. Accéder à http://localhost:4200/
