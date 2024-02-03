## Lancement de l'application 
1. Récupérer les dépendances :
```bash
npm i
```
2. Lancer l'application avec : 
```bash
npm run start
```
## Routes
### Vault
#### POST /vault
##### Description
Création du coffre 
##### Body
name : nom du coffre
password : le mot de passe du coffre
##### Code
201, created : le coffre a bien été créé et sauvegardé
400, bad request : pas de mot de passe fourni
400, bad request : pas de nom de coffre fourni
500, server error : pas de coffre trouvé
409, conflict : un coffre a déjà ce nom là
#### GET /vault
##### Description
Récupération d'un coffre 
##### Query
id : id du coffre
password : le mot de passe du coffre
##### Code
200, ok : le coffre a été trouvé et fourni au client
200, ok : si pas de id et mot de passe fournis, tous les coffres sont renvoyés
400, bad request : pas de mot de passe fourni
400, bad request : pas de id de coffre fourni
500, server error
#### POST /vault/import
##### Description
Import d'un coffre 
##### Query
password : le mot de passe du coffre
##### Body
vault : fichier du coffre .json
##### Code
200, ok : le coffre a bien été importé
400, bad request : pas de mot de passe fourni
400, bad request : pas de fichier fourni
400, bad request : pas de le bon nom body de fichier fourni
400, bad request : pas le bon type de fichier fourni
500, server error : pas de coffre trouvé
#### GET /vault/export
##### Description
Récupération d'un coffre en fichier 
##### Query
id : id du coffre
password : le mot de passe du coffre
##### Code
200, ok : le coffre a été trouvé et fourni au client
400, bad request : pas de mot de passe fourni
400, bad request : pas de id de coffre fourni
500, server error
### Password
#### POST /password
##### Description
Création d'un mot de passe
##### Body
vaultPassword : le mot de passe du coffre
id : l'id du coffre
label : label du nouveau mot de passe 
password : nouveau mot de passe
##### Code
200, ok : le mot de passe a bien été créé
400, bad request : tous les paramètres body n'ont pas été fournis
500, server error
#### DELETE /password
##### Description
Suppression d'un mot de passe d'un coffre
##### Body
vaultPassword : le mot de passe du coffre
id : l'id du coffre
passwordId : l'id du mot de passe à supprimer 
##### Code
200, ok : le mot de passe a bien été supprimé
400, bad request : tous les paramètres body n'ont pas été fournis
500, server error
#### PUT /password
##### Description
Edition d'un mot de passe
##### Body
vaultPassword : le mot de passe du coffre
id : l'id du coffre
passwordId : l'id du mot de passe à supprimer 
password : le nouveau mot de passe
##### Code
200, ok : le mot de passe a bien été modifié
400, bad request : tous les paramètres body n'ont pas été fournis
500, server error
