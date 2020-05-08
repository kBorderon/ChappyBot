const { PREFIX } = require('../../configuration/config.js');

/**
 * Run de la commande rôles
 * @author Kévin Borderon	
 * @module roles/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	const nomServeur = message.channel.guild.name;

	/* Récupère les rôles présents sur le serveur Discord où la commande ?roles est utilisée */
	const listeRoles = Array.from(message.channel.guild.roles.cache.values());
	const tailleListeRoles = listeRoles.length;
	let messageRetour = `Le serveur ${nomServeur} dispose des rôles suivants :\n`;

	for(let index = 0; index < tailleListeRoles; index++){
		
		/* Sur le message du dernier rôle on place un . sinon ; */
		if(index == tailleListeRoles - 1){
			messageRetour += `\t- ${listeRoles[index].name}.`;
		} else {
			messageRetour += `\t- ${listeRoles[index].name} ;\n`;
		}
	}

	/* On envoie le message préparé, avec pour caractéristique l'utilisation de caractères Ascii */
	message.channel.send(messageRetour, {
		code: 'asciidoc'}
	);
};

/**
 * Help de la commande rôles
 * @author Kévin Borderon	
 * @module roles/help
 * @param {Array.<Roles>} ['roles'] - Indique les aliases de la commande rôles
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande rôles
 * @param {number} cooldown - Indique le cooldown de la commande rôles avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande rôles
 * @param {string} nom - Indique le nom de la commande rôles
 * @param {string} utilisation - Indique l'utilisation de la commande rôles
 */
module.exports.help = {
	aliases:['roles'],
	args: false,
	categorie: 'Serveur',
	cooldown: 10,
	description: 'Renvoie les rôles disponibles sur ce serveur.',
	nom: 'roles',
	utilisation: 'aucun argument'
};
