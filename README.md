# DevBlog

Un blog destiné aux développeurs web !

## Prérequis 

Node.js 
npm
Nodemon 
MongoDB Compass


## Installation 



Clonez ce répertoire sur votre IDE préféré et placez-vous dans le dossier à l'aide de votre terminal.

### Préparer la base de données 

Si ce n'est pas déjà fait, créez votre compte sur MongoDB Atlas :
https://www.mongodb.com/cloud/atlas/register

Après avoir créé votre cluster, créez une 'Database' nommée 'blog'
A l'intérieur de cette 'Database' créez 2 collections nommées 'articles' et 'users'

Dans le dossier 'back' de ce répertoire, allez dans le fichier .env.example afin de remplacer : <username>, <password>, et <cluster-address> par vos informations d'identification et l'adresse de votre cluster. 

Ouvrez MongoDB Compass et connectez-vous à votre cluster. 

Dans la collection 'articles', importez le fichier test.articles.json présent dans le dossier bdd_exemple de ce projet. 
Dans la collection 'users', importez le fichier test.users.json présent dans le dossier bdd_exemple de ce projet. 

### Lancer le backend 

```bash
cd back
npm install
nodemon server.js
```

### Lancer le frontend 

```bash
cd ..
cd front
npm install
npm run dev
```


Vous pouvez désormais vous connecter et visualiser les articles de blog avec les profils suivants : 

Lecteur connecté : 
Marie 
Blachere
marie.blachere@gmail.com
Mot de passe : Marie1857*

Administrateur: 
Florian 
Saliba
florian.saliba@gmail.com
Mot de passe : 00000000




