const { MessageEmbed, MessageAttachment } = require('discord.js');
const { PREFIX } = require('../../configuration/config.js');
const image = new MessageAttachment('./contenu/sel.png')

/**
 * Run de la commande sel
 * @author Kévin Borderon	
 * @module sel/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	/* On récupère la première mention d'un utilisateur dans les arguments args, si aucune mention utilisateur n'est présente, on return null */
	const mentionUtilisateur = message.mentions.users.first() || null;  //message.mentions.users.first() || null;

	/* Si mentionUtilisateur != null */
		if(mentionUtilisateur) {
		contenu = new MessageEmbed()
			.setColor("#0014f2")
			.setTitle("Tu sales !")
			.setURL("https://i.kym-cdn.com/photos/images/original/001/462/554/ebc.jpg")
			.setTimestamp()
			.setDescription(`Image de mon coéquipier ${mentionUtilisateur} le marais salant !`)
			.setThumbnail(mentionUtilisateur.displayAvatarURL())
			.attachFiles(image)
			.setFooter(`${message.author.username} : "Fini de saler !"`, message.author.avatarURL())
			.setImage('attachment://sel.png');
		
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
 * Help de la commande sel
 * @author Kévin Borderon	
 * @module sel/help
 * @param {Array.<Sel>} ['sel'] - Indique les aliases de la commande sel
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments
 * @param {string} categorie - Indique la catégorie de la commande sel
 * @param {number} cooldown - Indique le cooldown de la commande sel avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande sel
 * @param {string} nom - Indique le nom de la commande sel
 * @param {string} utilisation - Indique l'utilisation de la commande sel
 */
module.exports.help = {
	aliases: ['sel'],
	args: true,
	categorie: 'Meme',
	cooldown: 20,
	description: 'Renvoie l\'image de l\'utilisateur salant.',
	nom: 'sel',
	utilisation: '<@pseudo_du_joueur>'
};
