const { MessageEmbed } = require("discord.js");
const { PREFIX } = require('../../configuration/config.js');

/** 
 * Actualisation des compteurs recensant les utilisateurs
 * @author Kévin Borderon
 * @param {Array.<Object>} tableau - Le tableau à deux dimensions contenant nos compteurs
 * @param {number} index - L'index du tableau à mettre à jour
 * @param {string} appareil - L'appareil utilisé par l'utilisateur discord
 */
const actualiserCompteur = (tableau, index, appareil) => {
	switch(appareil){
		case 'desktop': tableau[index][2] += 1;
			break;

		case 'mobile': tableau[index][1] += 1;
		 break;

		case 'web':	tableau[index][0] += 1;
			break;	
	} 
}

/**
 * Run de la commande membres
 * @author Kévin Borderon	
 * @module membres/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	const nomServeur = message.guild.name;

	/* Récupère les membres présents sur le serveur Discord où la commande ?membres est utilisée */
	const listeMembres = Array.from(message.guild.members.cache.values());
	const taillelisteMembres = listeMembres.length;
	const nbLignes = 4;
	const nbColonnes = 4;

	/* Tableau à 2 dimensions */
	const tableauCompteurs = [];

	/* Description du tableauCompteurs 
	 * tableauCompteurs[0][0] : compteur du nombre de personnes possédant le status ne pas déranger, utilisant Discord sur un navigateur Web
	 * tableauCompteurs[0][1] : compteur du nombre de personnes possédant le status ne pas déranger, utilisant Discord mobile
   * tableauCompteurs[0][2] : compteur du nombre de personnes possédant le status ne pas déranger, utilisant Discord pc
   * tableauCompteurs[0][3] : compteur du nombre de bots possédant le status ne pas déranger
	 * tableauCompteurs[1][0] : compteur du nombre de personnes absentes, utilisant Discord sur un navigateur Web
	 * tableauCompteurs[1][1] : compteur du nombre de personnes absentes, utilisant Discord mobile
   * tableauCompteurs[1][2] : compteur du nombre de personnes absentes, utilisant Discord pc
   * tableauCompteurs[1][3] : compteur du nombre de bots absents
	 * tableauCompteurs[2][0] : compteur du nombre de personnes déconnectées, utilisant Discord sur un navigateur Web => IMPOSSIBLE DE COMPTABILISER // utilisation : compteur total des non bots déconnectés
	 * tableauCompteurs[2][1] : compteur du nombre de personnes déconnectées, utilisant Discord mobile => IMPOSSIBLE DE COMPTABILISER
   * tableauCompteurs[2][2] : compteur du nombre de personnes déconnectées, utilisant Discord pc => IMPOSSIBLE DE COMPTABILISER
   * tableauCompteurs[2][3] : compteur du nombre de bots déconnectés
	 * tableauCompteurs[3][0] : compteur du nombre de personnes connectées, utilisant Discord sur un navigateur Web
	 * tableauCompteurs[3][1] : compteur du nombre de personnes connectées, utilisant Discord mobile
   * tableauCompteurs[3][2] : compteur du nombre de personnes connectées, utilisant Discord pc
   * tableauCompteurs[3][3] : compteur du nombre de bots connectés
	 */
	
	/* Initialisation du tableau à 2 dimensions */
	for(let ligne = 0; ligne < nbLignes; ligne++) {
		/* Initialisation de la deuxième dimension */
		tableauCompteurs.push([ligne]); 

		for(let colonne = 0; colonne < nbColonnes; colonne++){
			tableauCompteurs[ligne][colonne] = 0;
		} 
	}	

	/* Parcours de la liste de nos membres */
	for(let index = 0; index < taillelisteMembres; index++) {
		/* Status de connexion de l'utilisateur */
		let statutUtilisateur = Object(listeMembres[index].presence.status).toString();
		let appareilUtilisateur = null;

		/* On récupère true si l'utilisateur est un bot sinon false */
		let estUnBot = listeMembres[index].user.bot;
		
		switch(statutUtilisateur){
			case 'dnd':	
				/* Si l'utilisateur est un bot, on incrémente son compteur */
				if(estUnBot){
					tableauCompteurs[0][3] = tableauCompteurs[0][3] + 1;
		
				/* Si l'utilisateur n'est pas un bot, on incrémente son compteur */
				} else {
					appareilUtilisateur = Object.keys(listeMembres[index].presence.clientStatus)[0].toString();
					actualiserCompteur(tableauCompteurs, 0, appareilUtilisateur);
				}
				break;

			case 'idle': 
				/* Si l'utilisateur est un bot, on incrémente son compteur */
				if(estUnBot){
					tableauCompteurs[1][3] = tableauCompteurs[1][3] + 1;
		
				/* Si l'utilisateur n'est pas un bot, on incrémente son compteur */
				} else {
					appareilUtilisateur = Object.keys(listeMembres[index].presence.clientStatus)[0].toString();
					actualiserCompteur(tableauCompteurs, 1, appareilUtilisateur);
				}
				break;


			case 'offline':	
				/* Si l'utilisateur est un bot, on incrémente son compteur */
				if(estUnBot){
					tableauCompteurs[2][3] = tableauCompteurs[2][3] + 1;
		
				/* Si l'utilisateur n'est pas un bot, on incrémente son compteur */
				} else {
					/* On ne peut pas savoir quel est l'appareil utilisé puisque l'utilisateur n'est pas là, le compteur total sera alors tableauCompteurs[2][0] */
					tableauCompteurs[2][0] = tableauCompteurs[2][0] + 1;
				}
				break;

			case 'online':
				/* Si l'utilisateur est un bot, on incrémente son compteur */
				if(estUnBot){
					tableauCompteurs[3][3] = tableauCompteurs[3][3] + 1;
		
				/* Si l'utilisateur n'est pas un bot, on incrémente son compteur */
				} else {
					appareilUtilisateur = Object.keys(listeMembres[index].presence.clientStatus)[0].toString();
					actualiserCompteur(tableauCompteurs, 3, appareilUtilisateur);
				}
				break;					
		} 
	}

	let totalAbsents = tableauCompteurs[1][0] + tableauCompteurs[1][1] + tableauCompteurs[1][2] + tableauCompteurs[1][3];
	let totalConnectes = tableauCompteurs[3][0] + tableauCompteurs[3][1] + tableauCompteurs[3][2] + tableauCompteurs[3][3];
	let totalDeconnectes = tableauCompteurs[2][0];
 	let totalConcentres = tableauCompteurs[0][0] + tableauCompteurs[0][1] + tableauCompteurs[0][2] + tableauCompteurs[0][3];
	let totalMembres = totalAbsents + totalConnectes + totalDeconnectes;

	let messageRetour = `Il y a actuellement **${totalMembres} utilisateurs** présents sur ce serveur. \nIls sont répartis de la façon suivante : \n\n`;
	messageRetour += `- **${totalConnectes} connecté(s)** dont : \n* **${tableauCompteurs[3][3]} bot(s) ;\n** * **${tableauCompteurs[3][0]} personne(s)** sur Discord navigateur ;\n* **${tableauCompteurs[3][1]} personne(s)** sur Discord mobile ;\n* **${tableauCompteurs[3][2]} personne(s)** sur Discord launcher pc.\n\n`;
	messageRetour += `- **${totalAbsents} absent(s)** dont : \n* **${tableauCompteurs[1][3]} bot(s) ;\n** * **${tableauCompteurs[3][0]} personne(s)** sur Discord navigateur ;\n* **${tableauCompteurs[1][1]} personne(s)** sur Discord mobile ;\n* **${tableauCompteurs[1][2]} personne(s)** sur Discord launcher pc.\n\n`;
	messageRetour += `- **${totalConcentres} concentré(s)** dont : \n* **${tableauCompteurs[0][3]} bot(s) ;\n** * **${tableauCompteurs[0][0]} personne(s)** sur Discord navigateur ;\n* **${tableauCompteurs[0][1]} personne(s)** sur Discord mobile ;\n* **${tableauCompteurs[0][2]} personne(s)** sur Discord launcher pc.\n\n`;
	messageRetour += `- **${totalDeconnectes} déconnecté(s)** dont : \n* **${tableauCompteurs[2][3]} bot(s) ;\n** * **${tableauCompteurs[2][0]} personne(s)** sur Discord navigateur ;\n* **${tableauCompteurs[2][1]} personne(s)** sur Discord mobile ;\n* **${tableauCompteurs[2][2]} personne(s)** sur Discord launcher pc.\n\n`;

	const contenu = new MessageEmbed()
			.setColor("#cb00ea")
			.setTitle(`Recensement des utilisateurs du serveur ${nomServeur}`)
			.setTimestamp()
			.setDescription(messageRetour)
			.setFooter(`${message.author.username} : "C'est l'heure du recensemet !"`, message.author.avatarURL());

	/* On envoie le message préparé, sur le channel ayant l'ID cible */
	client.channels.cache.get('<votre_id_channel>').send(contenu); /* A REMPLACER par l'id de votre salon cible */
};

/**
 * Help de la commande membres
 * @author Kévin Borderon	
 * @module membres/help
 * @param {Array.<Membres>} ['membres'] - Indique les aliases de la commande membres
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande membres
 * @param {number} cooldown - Indique le cooldown de la commande membres avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande membres
 * @param {string} nom - Indique le nom de la commande membres
 * @param {string} utilisation - Indique l'utilisation de la commande membres
 */
module.exports.help = {
	aliases:['membres'],
	args: false,
	categorie: 'Serveur',
	cooldown: 10,
	description: 'Renvoie les informations concernant les membres présents sur ce serveur.',
	nom: 'membres',
	utilisation: 'aucun argument'
};
