const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX, TOKEN_BLAGUE_API } = require('../../configuration/config.js');

/**
 * Run de la commande blague
 * @author Kévin Borderon	
 * @module blague/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	/* Liste actuelle des types de blagues présentes au sein de l'API */
	const typesBlagues = ['beauf', 'blondes', 'dark', 'dev', 'global', 'limit'];

	/* Notre objet stockant la blague */
	var blague = '';

	/* Notre objet stockant le type de blague souhaité */
	var theme = '';

	/* On vérifie qu'un paramètre est passé */
	if(args.length > 0){

		/* Si le thème passé en paramètre appartient aux thèmes présents, nous utiliserons ce thème*/
		var theme = typesBlagues.includes(args[0].toLowerCase())? args[0].toLowerCase() : 'default';
	}

	/* Si le thème passé en paramètre ou non, n'est pas reconnu, on lance une blague random*/
	if(theme === 'default'){
		fetch('https://www.blagues-api.fr/api/random', {
			headers: {
				'Authorization': `Bearer ${TOKEN_BLAGUE_API}`
			}
		}).then(reponse => reponse.json())
			.then(donnees => {
				/* Récupération de la blague depuis l'API */
				blague += `${donnees.joke}\n**Réponse :** ${donnees.answer}`;
				/* Récupération du thème de la blague */
				theme = `${donnees.type}`;

				let contenu = new MessageEmbed()
				.setColor("#d17dc1")
				.setTitle("Blague sur demande")
				.setURL("https://blagues-api.fr")
				.setTimestamp()
				.setDescription(`**Thème blague :** ${theme.toLowerCase()}.\n**Blague :** ${blague}.`)
				.setFooter("Blague aléatoire !");

				/* On envoie le message préparé */
				message.channel.send(contenu);
		});
	/* Thème reconnu, on lance la blague */
	} else {
		fetch(`https://www.blagues-api.fr/api/type/${theme}/random`, {
			headers: {
				'Authorization': `Bearer ${TOKEN_BLAGUE_API}`
			}
		}).then(reponse => reponse.json())
			.then(donnees => {
				/* Récupération de la blague depuis l'API */
				blague += `${donnees.joke}\n**Réponse :** ${donnees.answer}`;

				let contenu = new MessageEmbed()
				.setColor("#d17dc1")
				.setTitle("Blague sur demande")
				.setURL("https://blagues-api.fr")
				.setTimestamp()
				.setDescription(`**Thème blague :** ${theme.toLowerCase()}.\n**Blague :** ${blague}.`)
				.setFooter("Blague aléatoire !");

				/* On envoie le message préparé */
				message.channel.send(contenu);
		});
	}			
};

/**
 * Help de la commande blague
 * @author Kévin Borderon	
 * @module blague/help
 * @param {Array.<Blague>} ['blague', 'joke'] - Indique les aliases de la commande blague
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande blague
 * @param {number} cooldown - Indique le cooldown de la commande blague avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande blague
 * @param {string} nom - Indique le nom de la commande blague
 * @param {string} utilisation - Indique l'utilisation de la commande blague
 */
module.exports.help = {
	aliases:['blague', 'joke'],	
	args: false,
	categorie: 'Utilitaire',
	cooldown: 10,
	description: 'Renvoie une blague aléatoirement',
	nom: 'blague',
	utilisation: 'aucun argument ou '
};
