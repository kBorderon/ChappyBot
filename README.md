# bot-discord 

## Partie 1 - Présentation

Ce projet consiste en la réalisation d'un bot Discord. Ce dernier devra réaliser différentes interactions (commandes), nous utiliserons différentes API afin d'améliorer ses capacités de fonctionnement. 
Ce bot sera exécuté depuis un Raspberry Pi, mais vous pouvez le lancer depuis n'importe quelle autre plateforme (Windows, Mac, Linux, autre carte de développement). 
Pour la réalisation de ce projet, je me suis basé sur les guides et tutoriels de création de bot de la chaîne Youtube [**getCodingKnowledge**](https://www.youtube.com/channel/UCUjo_IKa9Cqkx_x-rMly8MA "lien vers la chaîne Youtube de getCodingKnowledge").  

> #Nouveauté : Déploiement du bot sur la plateforme Heroku.  
> Si vous souhaitez tester ce bot discord, je vous invite à rejoindre le serveur Discord ci-joint (**[lien](https://discord.gg/u6pGvbG)**). Le bot y est déployé grâce à la plateforme **[Heroku](https://www.heroku.com/)**. **Si le bot est déconnecté (version gratuite d'Heroku), merci de m'envoyer un message privé, pour que je le réactive.**

### Auteur 

**Borderon Kévin**

## Partie 2 - Prérequis
Vous devez au préalable, avoir installé sur votre machine Git et Node.js.   
Pour savoir si vous possédez git, tapez la commande dans un terminal : **git --version** (vous devriez voir apparaître la version de git sinon une erreur).  
Pour savoir si vous possédez nodejs, tapez la commande **node --version** (vous devriez voir apparaître la version de node sinon une erreur) et pour npm : **npm --version** (pareil, obtention de sa version ou erreur).

## Partie 3 - Installation du bot

Une fois avoir cloné ce dépôt git. Placez vous sur la branche que vous souhaitez récupérer (**git checkout <nom_branche>**), déplacez-vous sur cette branche (**git checkout <nom_branche>**) puis récupérez le contenu présent sur le dépôt git (**git pull**).  
> Pour récupérer le contenu du bot discord, veuillez vous déplacer sur une autre branche que la master, celle-ci ne présente que le projet.   
> Par exemple, si nous souhaitons récupérer le contenu de la branche version_1, nous devons faire **git checkout version_1** (suivez ensuite les autres commandes).  

Une fois la branche récupérée, placez-vous dans le dossier bot-discord. Executez la commande **npm install**, puis **npm run docs**.  

L'arborescence du dossier, devra être la suivante :

```
\ 
	\ bot-discord
		\commandes
		\configuration
		\contenu
		\docs
		\evenements
		\node_modules
		- bot.js
		- jsdoc.json
		- package.json
		- package-lock.json
		- README.md
```

### Arborescence du projet

| Élément									| Description																																									|
| :-------------------		| :---------------------------------------------------------------------------------------		|
| `/bot-discord` 					| Répertoire du projet du bot discord 																												| 
| `/commandes`						| Répertoire contenant des sous-dossiers, qui comportent nos fichiers commandes .js 					|
| `/configuration`				| Répertoire contenant nos fichiers de configuration pour les API que nous allons utiliser	 	|
| `/contenu`							| Répertoire contenant les différents fichiers (image etc.) utilisés par nos commandes 				|
| `/docs`									| Répertoire contenant notre documentation, ouvrez index.html dans votre navigateur 					|
| `/evenements`						| Répertoire contenant les évènements de notre bot																						|
|	`/node_modules` 				| Répertoire contenant les modules node nécessaires pour notre bot 														|
| `bot.js`								| Fichier principale qui lance l'exécution de notre bot 																			|
| `jsdoc.json`						| Fichier de configuration pour le module Jsdoc, réalisant notre documentation 								|
| `package.json`					| Fichier de configuration, permettant l'installation des modules node nécessaires 						| 
| `package-lock.json` 		| Fichier généré lorsque l'on utilise la commande npm install dans le dossier bot-discord 		|	
| `README.md`							| Fichier présentant le projet de notre bot Discord 																					|

Si vous souhaitez plus de détails, n'hésitez pas à regarder directement les fichiers ou à me contacter.  

## Partie 4 - Configuration du Bot

Comme je le disais plus haut, ce bot sera présent sur un Raspberry Pi. Pour pouvoir créer et customiser votre propre bot personnel, je vous invite à consulter la première partie ce tutoriel en Anglais [Creating a Bot Account](https://discordpy.readthedocs.io/en/latest/discord.html "lien du tutoriel Anglais"), celle qui présente la création du Bot sur la plateforme Discord dédiée aux développeurs.  
Vous pouvez également trouver d'autres tutoriels en Français ou dans une autre langue concernant la création d'un bot.  

Une fois votre bot créé, customisé (nom, image etc.), vous **devez modifier le fichier config.js avant l'utilisation du bot, remplacez <votre_token> par le token de votre bot** présent sur la plateforme où vous avez créé une application et un bot. Le token se situe à l'emplacement suivant : onglet Bot, Build-A-Bot et Token, copiez le token présent dans notre fichier.  

Votre bot est dorénavant lié à ce projet, il utilisera ce qui y sera développé (faites des gits pull régulièrement) en plus de ce que vous développerez. Pour ajouter votre bot à un serveur Discord, je vous invite à consulter le tutoriel précédent.

## Partie 5 - Activation du bot

Pour activer le bot, **placez-vous dans le dossier bot-discord, puis exécutez la commande : node bot.js**, vous devriez voir les commandes chargées, ainsi que le message connexion du bot ...  
Tant que votre terminal sera ouvert avec la commande précédente saisie, le bot fonctionnera, nous vous indiquerons plus tard comment lancer en arrière-plan le bot.

## Partie 6 - Utilisation du bot

Pour utiliser correctement le bot, vous devez écrire dans un channel de votre discord **?nom_commande <argument_1> <argument_2> (etc. d'autre arguments si nécessaires)**. La première commande que je vous invite à tester est la commande **?help**. Cette commande vous indiquera l'ensemble des commandes disponibles sur votre serveur Discord.  
Pour connaître l'utilisation d'une commande, veuillez écrire : **?help <nom_commande>**, par exemple **?help ping** vous décrira le fonctionnement de **?ping**.
