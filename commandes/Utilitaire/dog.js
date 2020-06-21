const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX, TOKEN_DOG_API } = require('../../configuration/config.js');

/**
 * Run de la commande dog
 * @author Kévin Borderon	
 * @module dog/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	/* Contenu du message que nous envoyons */
	var description = '';

	/* URL de l'image ou d'un gif d'un chien */
	var imageChien = '';

	fetch(`https://api.thedogapi.com/v1/images/search?x-api-key=${TOKEN_DOG_API}`).then(function(reponse){
		reponse.json().then(donnees => { 
			imageChien += donnees[0]['url'];	
			description += 'Image aléatoire d\'un chien.';
			
			const contenu = new MessageEmbed()
					.setColor("#f49aee")
					.setTitle(`Image d'un chien 🐶`)
					.setURL("https://thedogapi.com")
					.setTimestamp()
					.setDescription(`${description}`)
					.setFooter('Image aléatoire d\'un chien de TheDogAPI !')
					.setImage(`${imageChien}`);

			/* On envoie le message préparé */
			message.channel.send(contenu);
		});
	});
};


/**
 * Help de la commande dog
 * @author Kévin Borderon	
 * @module dog/help
 * @param {Array.<Dog>} ['dog', 'chien'] - Indique les aliases de la commande dog
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande dog
 * @param {number} cooldown - Indique le cooldown de la commande dog avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande dog
 * @param {string} nom - Indique le nom de la commande dog
 * @param {string} utilisation - Indique l'utilisation de la commande dog
 */
module.exports.help = {
	aliases:['dog', 'chien'],	
	args: false,
	categorie: 'Utilitaire',
	cooldown: 10,
	description: 'Renvoie une image ou un gif aléatoire d\'un chien.',
	nom: 'dog',
	utilisation: "aucun argument"
};
