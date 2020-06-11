const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX, TOKEN_METEO_API } = require('../../configuration/config.js');

/**
 * Run de la commande meteo
 * @author Kévin Borderon	
 * @module meteo/run
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	/* Condition météorologique actuelle */
	var conditionMeteo = '';

	/* Contenu du message que nous envoyons */
	var description = '';
	
	/* Direction du vent */	
	var directionVent = '';

	/* Humidité */
	var humidite = '';

	/* Indicateur journée : jour ou nuit */
	var indicateurJournee = '';

	/* Nom de la ville */
	var nomVille = '';

	/* Nom de la région */
	var nomRegion = '';

	/* Précipitation */
	var precipitation = '';

	/* Probabilité de précipitations */
	var probabilitePrecipitation = '';
	
	/* Température actuelle */
	var temperature = '';

	/* Température minimum */
	var temperatureMinimum = '';

	/* Température maximum */
	var temperatureMaximum = '';

	/* Température actuelle ressentie */
	var temperatureRessentie = '';

	/* Température actuelle ressentie */
	var temperatureRessentie = '';

	/* Ultraviolet */
	var uv = '';

	/* Force du vent en km/h */
	var vent = '';	
	
	/* Variables émojis */
		/* Emoji humidité */
		const humiditeEmoji = '💧';

		/* Emoji jour nuit */
		const jourNuitEmoji = '🌓';

		/* Emoji précipitation */
		const precipitationEmoji = '🌧️';		

		/* Emoji probabilité précipitation personnalisé */
		const probabilitePrecipitationEmoji = '☔';
			
		/* Emoji statut journée */
		var statutJourneeEmoji = '';

		/* Emoji température ressentie */
		const temperatureRessentieEmoji = '🌞'; 

		/* Emoji thermometre personnalisé */
		const thermometreEmoji = message.guild.emojis.cache.get('<votre_id_emoji>'); // Lire README.md dans le dossier contenu/emojis
 
		/* Emoji ultraviolet */
		const uvEmoji = message.guild.emojis.cache.get('<votre_id_emoji>'); // Lire README.md dans le dossier contenu/emojis

		/* Emoji vent */
		const ventEmoji = '💨';
	
	/* Récupération de la ville */
	for(let index = 0; index < args.length; index++){
		nomVille += `${args[index]} `;
	}	

	fetch(`http://api.weatherapi.com/v1/forecast.json?key=${TOKEN_METEO_API}&q=${nomVille}&days=3&lang=fr`).then(function(reponse){
		if(reponse.status !== 200){
			message.channel.send(`<@${message.author.id}>, impossible d'obtenir la météo pour cette ville, le nom **${nomVille}** n'est pas reconnu !`);	
		} else {
			reponse.json().then(donnees => { 
				/* Actualisation de la direction du vent par rapport au 16 points cardinaux */
				switch(donnees['current']['wind_dir']){
					case 'N': directionVent += 'du Nord';
						break;

					case 'NNE': directionVent += 'du Nord-Nord-Est';
						break;

					case 'NE': directionVent += 'du Nord-Est';
						break;
	
					case 'ENE': directionVent += 'de l\'Est-Nord-Est';
						break;
				
					case 'E': directionVent += 'de l\'Est';
						break;
				 
					case 'ESE': directionVent += 'de l\'Est-Sud-Est';
						break;

					case 'SE': directionVent += 'du Sud-Est';
						break;

					case 'SSE': directionVent += 'du Sud-Sud-Est';
						break;

					case 'S': directionVent += 'du Sud';
						break;
		
					case 'SSW': directionVent += 'du Sud-Sud-Ouest';
						break;	

					case 'SW': directionVent += 'du Sud-Ouest';
						break;	

					case 'WSW': directionVent += 'de l\'Ouest-Sud-Ouest';
						break;					

					case 'W': directionVent += 'de l\'Ouest';
						break;	

					case 'WNW': directionVent += 'de l\'Ouest-Nord-Ouest';
						break;	

					case 'NW': directionVent += 'du Nord-Ouest';
						break;	

					case 'NNW': directionVent += 'du Nord-Nord-Ouest';
						break;	

					default: directionVent += 'erreur'; // Ne passera jamais là mais on ne sait jamais !
				}

				/* Actualisation de la condition météorologique actuelle */
				conditionMeteo += donnees['current']['condition']['text'];

				/* Actualisation de l'humidité */
				humidite += donnees['current']['humidity'] + '%';
	
				/* Actualisation de l'indicateur de journée */
				indicateurJournee += donnees['current']['is_day'] === 1 ? 'jour' : 'nuit';

				/* Actualisation du nom de la région */
				nomRegion += donnees['location']['region'];
			
				/* Actualisation de la précipitation */
				precipitation += donnees['current']['precip_in'] + ' mm';

				/* Actualisation de la probabilité précipitation */
				probabilitePrecipitation += donnees['forecast']['forecastday'][0]['day']['daily_chance_of_rain'] + '%';

				/* Actualisation de l'émoji statut journée */
				statutJourneeEmoji = "jour" === indicateurJournee ? "🌇":"🌃";

				/* Actualisation de la température */
				temperature += donnees['current']['temp_c'] + "°C";
				
				/* Actualisation de la température minimum */
				temperatureMinimum += donnees['forecast']['forecastday'][0]['day']['mintemp_c'] + "°C";

				/* Actualisation de la température maximum */
				temperatureMaximum += donnees['forecast']['forecastday'][0]['day']['maxtemp_c'] + "°C";
	
				/* Actualisation de la température resentie */
				temperatureRessentie += donnees['current']['feelslike_c'] + "°C";

				/* Actualisation de l'ultraviolet */
				uv += donnees['current']['uv'];

				/* Actualisation du vent */
				vent += donnees['current']['wind_kph'] + ` km/h en provenance ${directionVent}`;

				/* Actualisation de la description */
				description += `**${nomVille}, ${nomRegion}**\nActuellement **${conditionMeteo}**, avec une température de ${temperature}.`;

				const contenu = new MessageEmbed()
				.setColor("#4fd0ea")
				.setTitle(`Météo ${nomVille}`)
				.setURL("https://www.weatherapi.com/")
				.setTimestamp()
				.setDescription(description)
				.addFields(
					{ name: `${jourNuitEmoji} Statut journée`, value: `${statutJourneeEmoji} ${indicateurJournee}`, inline: true},
					{ name: `${thermometreEmoji} Température min`, value: `${temperatureMinimum}`, inline: true}, 
					{ name: `${thermometreEmoji} Température max`, value: `${temperatureMaximum}`, inline: true},
					{ name: `${temperatureRessentieEmoji} Température ressentie`, value: `${temperatureRessentie}`, inline: true},
					{ name: `${humiditeEmoji} Humidité`, value: `${humidite}`, inline: true},
					{ name: `${ventEmoji} Vent`, value: `${vent}`, inline: true},
					{ name: `${probabilitePrecipitationEmoji} Probabilité de précipitations`, value: `${probabilitePrecipitation}`, inline: true},
					{ name: `${uvEmoji} Ultraviolet`, value: `${uv}`, inline: true},
					{ name: `${precipitationEmoji} Précipitation`, value: `${precipitation}`, inline: true}
				)
				.setFooter(`Météo pour la ville ${nomVille}`);

				/* On envoie le message préparé */
				message.channel.send(contenu);
			});
		}
	});	
};

/**
 * Help de la commande meteo
 * @author Kévin Borderon	
 * @module meteo/help
 * @param {Array.<Meteo>} ['meteo', 'weather'] - Indique les aliases de la commande meteo
 * @param {boolean} args - Indique la présence OBLIGATOIRE d'arguments, ici ils ne sont pas obligatoires donc false
 * @param {string} categorie - Indique la catégorie de la commande meteo
 * @param {number} cooldown - Indique le cooldown de la commande meteo avant sa prochaine utilisation de la part du même utilisateur
 * @param {string} description - Indique la description de la commande meteo
 * @param {string} nom - Indique le nom de la commande meteo
 * @param {string} utilisation - Indique l'utilisation de la commande meteo
 */
module.exports.help = {
	aliases:['meteo', 'weather'],	
	args: true,
	categorie: 'Utilitaire',
	cooldown: 30,
	description: 'Renvoie la météo pour une ville précise',
	nom: 'meteo',
	utilisation: "<nom_ville>"
};
