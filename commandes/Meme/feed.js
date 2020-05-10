const { MessageEmbed, MessageAttachment } = require('discord.js');
const { PREFIX } = require('../../configuration/config.js');
const image = new MessageAttachment('./contenu/feed.png');

/**
 * Run de la commande feed
 * @author Kévin Borderon	
 * @module feed/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	let contenu;

	/* On récupère la première mention d'un utilisateur dans les arguments args, si aucune mention utilisateur n'est présente, on return null */
	const mentionUtilisateur = message.mentions.users.first() || null;

	/* Si mentionUtilisateur != null */
	if(mentionUtilisateur) {
		contenu = new MessageEmbed()
			.setColor("#0014f2")
			.setTitle("Tu feeds !")
			.setURL("https://gamewave.fr/static/images/news/headers/1c093-feed.webp")
			.setTimestamp()
			.setDescription(`Image de mon coéquipier ${mentionUtilisateur} qui a feed ses ennemis !`)
			.setThumbnail(mentionUtilisateur.displayAvatarURL())
			.attachFiles(image)
			.setFooter(`${message.author.username} : "Fini de feed !"`, message.author.avatarURL())
			.setImage('attachment://feed.png');
		
		message.channel.send(contenu);

  /* Si mentionUtilisateur == null */
	} else {
		const messageRetour = `Erreur, veuillez utilisez la commande la façon suivante : ${PREFIX}${this.help.nom} ${this.help.utilisation}`;

		/* On envoie le message préparé, avec pour caractéristique l'utilisation de caractères Ascii */
		message.channel.send(messageRetour, {
			code: 'asciidoc'}
		);
		}
};

/**
 * Help de la commande feed
 * @author Kévin Borderon	
 * @module feed/help
 * @param {Array.<Feed>} ['feed'] - Indique les aliases de la commande feed
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments
 * @param {string} categorie - Indique la catégorie de la commande feed
 * @param {number} cooldown - Indique le cooldown de la commande feed avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande feed
 * @param {string} nom - Indique le nom de la commande feed
 * @param {string} utilisation - Indique l'utilisation de la commande feed
 */
module.exports.help = {
	aliases:['feed'],
	args: true,
	categorie: 'Meme',
	cooldown: 20,
	description: 'Renvoie l\'image de l\'utilisateur ayant feed.',
	nom: 'feed',
	utilisation: '<@pseudo_du_joueur>'
};
