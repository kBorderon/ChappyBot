const { PREFIX } = require('../../configuration/config.js');

/**
 * Run de la commande userinfo
 * @author Kévin Borderon	
 * @module userinfo/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {		
		/* On récupère la première mention d'un utilisateur dans les arguments args, si aucune mention utilisateur n'est présente, on return null */
		const mentionUtilisateur = message.mentions.users.first() || null;
		let messageRetour = '';

		/* Si mentionUtilisateur != null */
		if(mentionUtilisateur){

			/* On définit le format de date que nous utiliserons */
			const optionsDate = {	weekday: 'long',
														year: 'numeric',
														month: 'long',
														day: 'numeric',
														hour: '2-digit',
														minute: '2-digit',
														second: '2-digit'				
													};

			/* On récupère la date de création du compte de l'utilisateur mentionné, au format français */
			const dateCreationUtilisateur = mentionUtilisateur.createdAt.toLocaleDateString('fr-FR', optionsDate);

			/* On récupère la date qui correspond à l'entrée de l'utilisateur mentionné dans ce serveur discord, au format français */
			const dateEntreeServeur = message.mentions.members.first().joinedAt.toLocaleDateString('fr-FR', optionsDate);

			/* Indique le statut utilisateur parmi ['offline','online', 'iddle', 'dnd'] */
			const statutUtilisateur = Object(mentionUtilisateur.presence.status).toString();
	
			/* Récupération du nom du serveur */
			const nomServeur = message.channel.guild.name;

			/* On récupère true si l'utilisateur est un bot sinon false */
			const typeUtilisateur = mentionUtilisateur.bot;

			messageRetour += `Voici le tag de la personne mentionnée : ${mentionUtilisateur.tag}. \nCet utilisateur a été créé le ${dateCreationUtilisateur}, a rejoint le serveur ${nomServeur} le ${dateEntreeServeur}.\nIl`;
			
			if(typeUtilisateur){
				messageRetour += ' est le bot de ce serveur et'
			}
			
			/* Si l'utilisateur est déconnecté, nous ne pouvons pas savoir quel appareil, il utilise actuellement */
			if(statutUtilisateur != 'offline' && !typeUtilisateur){
				const appareilUtilisateur = Object.keys(mentionUtilisateur.presence.clientStatus)[0].toString() || null;

				/* Le message est différent en fonction de l'appareil utilisé */
				switch(appareilUtilisateur){
					case 'web':	messageRetour += ` utilise actuellement un navigateur web et`;
										break;

					case 'mobile':	messageRetour += ` utilise actuellement un smartphone et`;
											 break;

					case 'desktop': messageRetour += ` utilise actuellement un ordinateur et`;
												break;
				} 
			}

			/* Le message est différent en fonction du statut de l'utilisateur */
			switch(statutUtilisateur){
				case 'offline':	messageRetour += ` est hors-ligne.`;
											break;

				case 'online':	messageRetour += ` est en ligne.`;
											break;

				case 'idle': messageRetour += ` est absent.`;
										break;

				case 'dnd': messageRetour += ` est en ne pas déranger.`;
									break;
				} 

			messageRetour += `\n\nIl dispose des rôles suivants : \n`;
			
			/* Liste des rôles dont dispose l'utilisateur mentionné */
			const rolesUtilisateur = Array.from(message.mentions.members.first().roles.cache.values());
			const tailleListeRoles = rolesUtilisateur.length;

			for(let index = 0; index < tailleListeRoles; index++){
				/* S'il s'agit du dernier rôle le message aura à la fin un . sinon un ;*/
				if(index == tailleListeRoles - 1){
					messageRetour += `\t- ${rolesUtilisateur[index].name}.`;
				} else {
					messageRetour += `\t- ${rolesUtilisateur[index].name} ;\n`;
				}
			}

		/* Si mentionUtilisateur == null */
		} else {
			messageRetour += `Erreur, veuillez utilisez la commande la façon suivante : ${PREFIX}${this.help.nom} ${this.help.utilisation}`;
		}

		/* On envoie le message préparé, avec pour caractéristique l'utilisation de caractères Ascii */
		message.channel.send(messageRetour, {
				code: 'asciidoc'}
		);
};

/**
 * Help de la commande userinfo
 * @author Kévin Borderon	
 * @module userinfo/help
 * @param {Array.<Userinfo>} ['userinfo'] - Indique les aliases de la commande userinfo
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments
 * @param {string} categorie - Indique la catégorie de la commande userinfo
 * @param {number} cooldown - Indique le cooldown de la commande userinfo avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande userinfo
 * @param {string} nom - Indique le nom de la commande userinfo
 * @param {string} utilisation - Indique l'utilisation de la commande userinfo
 */
module.exports.help = {
	aliases:['userinfo'],
	args: true,
	categorie: 'Utilisateur',
	cooldown: 10,
	description: 'Renvoie les informations d\'un utilisateur mentionné.',
	nom: 'userinfo',
	utilisation: '<@peudo_du_joueur>'
};
