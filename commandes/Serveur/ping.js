const { PREFIX } = require('../../configuration/config.js');

/**
 * Run de la commande ping
 * @author Kévin Borderon	
 * @module ping/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	/* Message déterminant la latence du bot */
	message.channel.send("Ping...").then(monMessage => {
		let ping = monMessage.createdTimestamp - message.createdTimestamp;

		monMessage.edit(`Latence du bot ${ping} ms.`);	
	});
};

/**
 * Help de la commande ping
 * @author Kévin Borderon	
 * @module ping/help
 * @param {Array.<Ping>} ['ping'] - Indique les aliases de la commande ping
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande ping
 * @param {number} cooldown - Indique le cooldown de la commande ping avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande ping
 * @param {string} nom - Indique le nom de la commande ping
 * @param {string} utilisation - Indique l'utilisation de la commande ping
 */
module.exports.help = {
	aliases:['ping'],	
	args: false,
	categorie: 'Serveur',
	cooldown: 10,
	description: 'Renvoie le délai du bot',
	nom: 'ping',
	utilisation: 'aucun argument'
};
