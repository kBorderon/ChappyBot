const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../configuration/config.js');
const { readdirSync } = require('fs');
const listeCategories = readdirSync('./commandes');

/**
 * Run de la commande help
 * @author Kévin Borderon	
 * @module help/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	if(!args.length){
		/* On stocke le nom des commandes (nom commande = nom fichier = champ nom dans help) */
		const nomsCommandes = client.commandes.keyArray();

		/* Indique la taille maximum entre deux noms de commande */
		const longueur = nomsCommandes.reduce(
			(long, str) => Math.max(long, str.length),
			0
		);

		let categorieCourante = "";

		var messageAide = `= Liste des commandes disponibles =\n\n[Utilise ${
			PREFIX}help <nom_de_la_commande> pour plus de détails]\n`;

 	/* Trie en fonction de la catégorie, ou du nom et de la catégorie */
		const tris = client.commandes
			.array()
			.sort((p,c) =>
				p.help.categorie > c.help.categorie
				? 1
				: p.help.nom > c.help.nom && p.help.categorie === c.help.categorie
				? 1
				: -1
		);

		tris.forEach(c => {
			const cat = c.help.categorie;
			
			/* Si la catégorie actuelle n'est pas présente, on l'ajoute dans le message */
			if(categorieCourante !== cat) {
				messageAide += `\u200b\n== ${cat} ==\n`;
				categorieCourante = cat;
			}

			/* On ajoute le nom de la commande actuelle dans le message */
			messageAide += `${PREFIX}${c.help.nom}${" ".repeat(longueur - c.help.nom.length
			)} :: ${c.help.description}\n`;
		});

		/* On envoie le message préparé, avec pour caractéristique l'utilisation de caractères Ascii */
		message.channel.send(messageAide, { 
			code: "asciidoc",
			split: { char: "\u200b" }
		});		
	} else {
		/* Récupération de la commande passée en paramètre */
		const commande = client.commandes.get(args[0]) || client.commandes.find(maCommande => maCommande.help.aliases && maCommande.help.aliases.includes(args[0]));

		/* La commande n'existe pas */
		if(!commande){
			return message.reply("Cette commande n'existe pas !");
		}

		let messageAide = `= ${commande.help.nom} = \ndescription :: ${commande.help.description}\nutilisation :: ${commande.help.utilisation}\n`; 

		/* Si la commande possède plusieurs alias, on les affiche sinon on affiche le seul alias */
		if(commande.help.aliases.length > 1){
				messageAide += `alias :: ${commande.help.aliases.join(', ')}\ncooldown :: ${commande.help.cooldown}sec\n`;
		} else {
			messageAide += `alias :: ${commande.help.aliases}\ncooldown :: ${commande.help.cooldown}sec`;
		}

		/* On envoie le message préparé, avec pour caractéristique l'utilisation de caractères Ascii */
		message.channel.send(messageAide,
			{code: "asciidoc"}
		);
	}
};

/**
 * Help de la commande help
 * @author Kévin Borderon	
 * @module help/help
 * @param {Array.<Help>} ['help', 'h'] - Indique les aliases de la commande help
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande help
 * @param {number} cooldown - Indique le cooldown de la commande help avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande help
 * @param {string} nom - Indique le nom de la commande help
 * @param {string} utilisation - Indique l'utilisation de la commande help
 */
module.exports.help = {
	aliases:['help', 'h'],
	args: false,
	categorie: 'Serveur',
	cooldown: 3,
	description: 'Renvoie l\'utilisation d\'une ou des commandes présentes.',
	nom: 'help',
	utilisation: 'aucun argument ou <nom_commande>'
};
