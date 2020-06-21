const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX, TOKEN_CAT_API } = require('../../configuration/config.js');

/**
 * Run de la commande cat
 * @author Kévin Borderon	
 * @module cat/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	/* Liste actuelle des catégories présentes au sein de l'API */
	const categoriesImages = new Map([ ['hats', 1], ['space', 2], ['sunglasses', 4], ['boxes', 5], ['ties', 7], ['sinks', 14], ['clothes', 15]]);

	/* Contenu du message que nous envoyons */
	var description = '';

	/* Description temporaire si la catégorie n'est pas reconnue */
	var descriptionTmp = '';

	/* Id de la categorie de l'image à retourner */
	var idCategorie = '';

	/* URL de l'image ou d'un gif d'un chat */
	var imageChat = '';

	/* Nom de la categorie de l'image à retourner */
	var nomCategorie = '';

	/* On vérifie qu'un paramètre est passé */
	if(args.length > 0){
		/* Récupération du nom de la catégorie à rechercher */
		nomCategorie = args[0].toLowerCase();

		/* Si la catégorie passée en paramètre appartient aux catégories présentes, nous l'utiliserons pour un appel sur l'API*/
		idCategorie =  categoriesImages.has(`${nomCategorie}`)? categoriesImages.get(`${nomCategorie}`) : 'default';

		if(idCategorie === 'default'){
			descriptionTmp += `\n<@${message.author.id}>, la catégorie de chat n'a pas été reconnue, veuillez utiliser un type en respectant la consigne suivante : ${this.help.utilisation}`;
		}
	}

	/* Si le thème passé en paramètre ou non, n'est pas reconnu, on lance une blague random*/
	if(args.length == 0 || idCategorie === 'default'){
		fetch(`https://api.thecatapi.com/v1/images/search?x-api-key=${TOKEN_CAT_API}`).then(function(reponse){
			reponse.json().then(donnees => { 
				imageChat += donnees[0]['url'];	
				description += 'Image aléatoire d\'un chat.';
				description += `${descriptionTmp}`;	
			
				const contenu = new MessageEmbed()
						.setColor("#f49aee")
						.setTitle(`Image d'un chat 🐱`)
						.setURL("https://thecatapi.com")
						.setTimestamp()
						.setDescription(`${description}`)
						.setFooter('Image aléatoire d\'un chat de TheCatAPI !')
						.setImage(`${imageChat}`);

				/* On envoie le message préparé */
				message.channel.send(contenu);
			});
		});
	} else {
		fetch(`https://api.thecatapi.com/v1/images/search?x-api-key=${TOKEN_CAT_API}&category_ids=${idCategorie}`).then(function(reponse){
			reponse.json().then(donnees => { 
				imageChat += donnees[0]['url'];	
				description += `Image aléatoire d\'un chat !\n**Categorie :** ${nomCategorie}`;

				const contenu = new MessageEmbed()
						.setColor("#f49aee")
						.setTitle(`Image d'un chat 🐱`)
						.setURL("https://thecatapi.com")
						.setTimestamp()
						.setDescription(`${description}`)
						.setFooter('Image aléatoire d\'un chat de TheCatAPI !')
						.setImage(`${imageChat}`);

				/* On envoie le message préparé */
				message.channel.send(contenu);
			});
		});
	}
};


/**
 * Help de la commande cat
 * @author Kévin Borderon	
 * @module cat/help
 * @param {Array.<Cat>} ['cat', 'chat'] - Indique les aliases de la commande cat
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande cat
 * @param {number} cooldown - Indique le cooldown de la commande cat avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande cat
 * @param {string} nom - Indique le nom de la commande cat
 * @param {string} utilisation - Indique l'utilisation de la commande cat
 */
module.exports.help = {
	aliases:['cat', 'chat'],	
	args: false,
	categorie: 'Utilitaire',
	cooldown: 10,
	description: 'Renvoie une image ou un gif aléatoire d\'un chat.',
	nom: 'cat',
	utilisation: "aucun argument ou <categorie_chat> parmi ['boxes', 'clothes', 'hats', 'sinks', 'space', 'sunglasses', 'ties']"
};
