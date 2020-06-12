const { MessageEmbed, MessageAttachment } = require("discord.js");
const image = new MessageAttachment('./contenu/images/au_revoir.png');

/**
 * Évènement guildMemberRemove
 * @author Kévin Borderon
 * @event Client#guildMemberRemove
 * @type {object}
 * @property {Client} client - Référence au bot
 * @property {GuildMember} member - Référence au membre quittant le serveur discord
 */
module.exports = (client, member) => {
	const nomServeur = member.guild.name;
	const utilisateur = member.user;

	const contenu = new MessageEmbed()
			.setColor("#d31d1d")
			.setTitle(`Au revoir à ${utilisateur.username}`)
			.setURL("https://img.over-blog-kiwi.com/1/31/67/43/20161128/ob_419371_au-revoir-2.jpg")
			.setTimestamp()
			.setDescription(`Au revoir, merci de ta visite sur le seveur Discord ${nomServeur} !`)
			.setThumbnail(utilisateur.displayAvatarURL())
			.attachFiles(image)
			.setFooter("Un utilisateur nous a quitté")
			.setImage('attachment://au_revoir.png');

	/* On envoie le message préparé, sur le channel ayant l'ID cible */
	client.channels.cache.get('711299071108841522').send(contenu); /* Salon logs du serveur discord Tests Bot Discord */
	client.channels.cache.get('711298566873677886').send(contenu); /* Salon général du serveur discord Tests Bot Discord */
};
