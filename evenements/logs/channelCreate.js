const { MessageEmbed } = require("discord.js");

/**
 * Évènement channelCreate
 * @author Kévin Borderon
 * @event Client#channelCreate
 * @type {object}
 * @throws {DiscordAPIError} Missing permssions - Le bot ne dispose pas des droits suffisants pour consulter les logs serveurs
 * @description ATTENTION : une erreur peut être générée, si le bot ne dispose pas de droits assez élevés. Vous pouvez attribuer un rôle administrateur, car je ne développerai pas de commandes sensibles disponibles par l'ensemble des utilisateurs du serveur discord où se situe le bot (faites attention si vous développez des commandes sensibles : kick, ban, mute ..)
 * @property {Client} client - Référence au bot
 * @property {GuildChannel} channel - Référence au channel créé à l'instant sur le serveur discord
 */
module.exports = async (client, channel) => {
	/* ATTENTION : une erreur peut être générée, si le bot ne dispose pas de droits assez élevés. Vous pouvez attribuer un rôle administrateur, car je ne développerai pas de commandes sensibles disponibles par 	 * l'ensemble des utilisateurs du serveur discord où se situe le bot (faites attention si vous développez des commandes sensibles : kick, ban, mute ..) */
	const journauxAuditGuilde = await channel.guild.fetchAuditLogs({
		limit: 1, /* On récupère une seule instance de nos logs serveurs (le 1 équivaut à la dernière) */
		type: 'CHANNEL_CREATE' /* Type de l'évènement à récupérer (valeur : CHANNEL_CREATE = 10) */
	});

	/* On récupère la première donnée contenue dans nos journauxAuditGuilde */
	const dernierChannelCree = journauxAuditGuilde.entries.first();

	/* On récupère l'objet User ayant réalisé la création du channel */
	const { executor } = dernierChannelCree;

	const contenu = new MessageEmbed()
			.setColor("#f2e44f")
			.setTitle("Création d'un nouveau channel")
			.setTimestamp()
			.setDescription(`Création du channel **${channel.name}** !`)
			.setFooter(executor.username, executor.displayAvatarURL());

	/* On envoie le message préparé, sur le channel ayant l'ID cible */
	client.channels.cache.get('<votre_id_channel>').send(contenu); /* A REMPLACER par l'id de votre salon cible  */
};