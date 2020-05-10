const { Discord } = require('discord.js');
const { PREFIX } = require('../../configuration/config.js');

/**
 * Run de la commande userroles
 * @author Kévin Borderon	
 * @module userroles/run
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
		/* Liste des rôles dont dispose l'utilisateur mentionné */
		const listeRoles = Array.from(message.mentions.members.first().roles.cache.values());
		const tailleListeRoles = listeRoles.length;

		messageRetour += `L'utilisateur ${mentionUtilisateur.tag} dispose des rôles suivants :\n`;

		for(let index = 0; index < tailleListeRoles; index++){
			/* S'il s'agit du dernier rôle le message aura à la fin un . sinon un ;*/
			if(index == tailleListeRoles - 1){
				messageRetour += `\t- ${listeRoles[index].name}.`;
			} else {
				messageRetour += `\t- ${listeRoles[index].name} ;\n`;
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
 * Help de la commande userroles
 * @author Kévin Borderon	
 * @module userroles/help
 * @param {Array.<Userroles>} ['userroles'] - Indique les aliases de la commande userroles
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments
 * @param {string} categorie - Indique la catégorie de la commande userroles
 * @param {number} cooldown - Indique le cooldown de la commande userroles avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande userroles
 * @param {string} nom - Indique le nom de la commande userroles
 * @param {string} utilisation - Indique l'utilisation de la commande userroles
 */
module.exports.help = {
	aliases:['userroles'],
	args: true,
	categorie: 'Utilisateur',
	cooldown: 10,
	description: 'Renvoie les rôles de l\'utilisateur mentionné.',
	nom: 'userroles',
	utilisation: '<@peudo_du_joueur>'
};
