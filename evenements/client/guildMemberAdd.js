const { MessageEmbed, MessageAttachment } = require("discord.js");
const image = new MessageAttachment('./contenu/bienvenue.png');

/**
 * Évènement guildMemberAdd
 * @author Kévin Borderon
 * @event Client#guildMemberAdd
 * @type {object}
 * @property {Client} client - Référence au bot
 * @property {GuildMember} member - Référence au membre ayant rejoint le serveur discord
 */
module.exports = (client, member) => {
	const nomServeur = member.guild.name;
	const utilisateur = member.user;

	const contenu = new MessageEmbed()
			.setColor("#2e990a")
			.setTitle(`Bienvenue à ${utilisateur.username}`)
			.setURL("https://www.cnajep.asso.fr/wp-content/uploads/2018/10/bienvenue.jpg")
			.setTimestamp()
			.setDescription(`Bienvenue parmis nous, sur le seveur Discord ${nomServeur} !`)
			.setThumbnail(utilisateur.displayAvatarURL())
			.attachFiles(image)
			.setFooter("Un utilisateur nous a rejoint")
			.setImage('attachment://bienvenue.png');

	/* On envoie le message préparé, sur le channel ayant l'ID cible */
	client.channels.cache.get('<votre_id_channel>').send(contenu); /* A REMPLACER par l'id de votre salon cible  */
};