const { MessageEmbed, MessageAttachment } = require('discord.js');
const { PREFIX } = require('../../configuration/config.js');
const image = new MessageAttachment('./contenu/rage.png');

/**
 * Run de la commande rage
 * @author Kévin Borderon	
 * @module rage/run
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
			.setTitle("GRRRR!!!")
			.setTimestamp()
			.setDescription(`Image de mon coéquipier ${mentionUtilisateur} qui a ragé !`)
			.setThumbnail(mentionUtilisateur.displayAvatarURL())
			.attachFiles(image)
			.setFooter(`${message.author.username} : "Fini de rager !"`, message.author.avatarURL())
			.setImage('attachment://rage.png');
		
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
 * Help de la commande rage
 * @author Kévin Borderon	
 * @module rage/help
 * @param {Array.<Rage>} ['rage'] - Indique les aliases de la commande rage
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments
 * @param {string} categorie - Indique la catégorie de la commande rage
 * @param {number} cooldown - Indique le cooldown de la commande rage avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande rage
 * @param {string} nom - Indique le nom de la commande rage
 * @param {string} utilisation - Indique l'utilisation de la commande rage
 */
module.exports.help = {
	aliases: ['rage'],
	args: true,
	categorie: 'Meme',
	cooldown: 20,
	description: 'Renvoie l\'image de l\'utilisateur rageant.',
	nom: 'rage',
	utilisation: '<@pseudo_du_joueur>'
};
