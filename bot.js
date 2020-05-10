const { Client, Collection } = require('discord.js');
const { http } = require('http');
const { readdirSync } = require('fs');
const { TOKEN, PREFIX, DEFAULT_COOLDOWN } = require('./configuration/config.js');

/**
	* Classe initialisant le bot Discord
	* @class Client
  * @author Kévin Borderon	
	*/
const client = new Client();

/** Initialisation des tableaux :
 * 1) des commandes présentes dans le dossier commandes et de ses sous-dossiers
 * 2) des délais associés à chacune des commandes que l'on récupère
 */
["commandes", "cooldowns"].forEach(x => client[x] = new Collection());

/** 
 * Initialisation et récupération des fichiers cibles présents dans les différents répertoires 
 * @author Kévin Borderon
 * @param {string} repertoire - Le répertoire contenant l'ensemble des commandes à récupérer
 */
const chargerCommandes = (repertoire = "./commandes/") => {
	readdirSync(repertoire).forEach(repertoires => {
		/* Récupération des fichiers .js comportant les évènements associés au bot */
		const commandes = readdirSync(`${repertoire}/${repertoires}/`).filter(fichiers => fichiers.endsWith(".js"));

		/* Activation de chacune de nos commandes */
		for(const fichier of commandes){
			const getNomFichier = require(`${repertoire}/${repertoires}/${fichier}`);
			/* Mise à jour de notre tableau commandes */
			client.commandes.set(getNomFichier.help.nom, getNomFichier);
			console.log(`Commande chargée : ${getNomFichier.help.nom}`);
		};
	});
};

/** 
 * Initialisation et récupération des fichiers des évènements associés au bot 
 * @author Kévin Borderon
 * @param {string} repertoire - Le répertoire contenant l'ensemble des évènements à récupérer
 */
const chargerEvenements = (repertoire = "./evenements/") => {
	readdirSync(repertoire).forEach(repertoires => {
		/* Récupération des fichiers .js comportant les évènements du bot */
		const evenements = readdirSync(`${repertoire}/${repertoires}/`).filter(fichiers => fichiers.endsWith(".js"));

		/* Activation de nos évènements */
		for(const fichier of evenements){
			const evenement = require(`${repertoire}/${repertoires}/${fichier}`);
		
			/* On récupère le nom du fichier actuel qui correspond au nom de l'évènement, par exemple message pour message.js */
			const nomEvenement = fichier.split(".")[0];

			/* On charge l'évènement en appliquant une liaison entre les paramètres nécessaires et le nom de l'évènement */
			client.on(nomEvenement, evenement.bind(null, client));
			console.log(`Évènement chargé : ${nomEvenement}`);
		};
	});
};

/* Chargement de toutes les commandes disponibles */
chargerCommandes();

/* Chargement de tous les évènements disponibles */
chargerEvenements();

/* Connexion de notre bot à notre serveur Discord */
client.login(TOKEN);
