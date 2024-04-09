# DevBlog

Un blog destiné aux développeurs web !

## Prérequis 

Node.js 
npm
un client mongoDB


## Installation 


Clonez ce répertoire sur votre IDE préféré et placez-vous dans le dossier à l'aide de votre terminal.

### Préparer la base de données 

Créez votre serveur mongoDB. 

Si vous utilisez mongoDB Atlas, voici les étapes à suivre: 

Si ce n'est pas déjà fait, créez votre compte sur MongoDB Atlas :
https://www.mongodb.com/cloud/atlas/register

Après avoir créé votre cluster, créez une 'Database' nommée 'blog'
A l'intérieur de cette 'Database' créez 2 collections nommées 'articles' et 'users'

Dans le dossier 'back' de ce répertoire, allez dans le fichier .env.example afin de remplacer : &lt;username&gt;, &lt;password&gt;, et &lt;cluster-address&gt; par votre nom d'utilisateur et un mot de passe, et l'adresse de votre cluster.


Ouvrez MongoDB Compass et connectez-vous à votre cluster afin d'accéder à la 'Database' nommée 'blog'

Dans la collection 'articles', importez le fichier blog.articles.json présent dans le dossier example.collections de ce projet. 
Dans la collection 'users', importez le fichier blog.users.json présent dans le dossier example.collections de ce projet. 

### Lancer le backend 

```bash
cd back
npm install
npm start 
```

ou en mode développement (nécessite nodemon): 
```bash
cd back
npm install
npm run dev
```

### Lancer le frontend 

```bash
cd ..
cd front
npm install
npm run dev
```


Vous pouvez désormais vous connecter et visualiser les articles de blog avec les profils de test suivants : 

Compte lecteur : 
Zinedine
Zidane
zidane@gmail.com
Mot de passe : 12345678

Compte Administrateur: 
Florian 
Saliba
florian.saliba@gmail.com
Mot de passe : 00000000




