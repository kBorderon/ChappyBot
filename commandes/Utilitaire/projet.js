const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../configuration/config.js');

/**
 * Run de la commande projet
 * @author Kévin Borderon	
 * @module projet/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	let contenu = new MessageEmbed()
			.setColor("#ffff63")
			.setTitle("Projet GitHub bot-discord")
			.setURL("https://github.com/kBorderon/bot-discord")
			.setTimestamp()
			.setDescription('Lien du projet GitHub bot-discord : **https://github.com/kBorderon/bot-discord** \n Licence : Licence MIT \n Documentation : JSDoc \nAuteur : Kévin Borderon')
			.setFooter("Projet bot-discord");

	/* On envoie le message préparé */
	message.channel.send(contenu);
};

/**
 * Help de la commande projet
 * @author Kévin Borderon	
 * @module projet/help
 * @param {Array.<Projet>} ['projet'] - Indique les aliases de la commande projet
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande projet
 * @param {number} cooldown - Indique le cooldown de la commande projet avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande projet
 * @param {string} nom - Indique le nom de la commande projet
 * @param {string} utilisation - Indique l'utilisation de la commande projet
 */
module.exports.help = {
	aliases:['projet'],	
	args: false,
	categorie: 'Utilitaire',
	cooldown: 10,
	description: 'Renvoie le lien du projet GitHub bot-discord.',
	nom: 'projet',
	utilisation: 'aucun argument'
};
