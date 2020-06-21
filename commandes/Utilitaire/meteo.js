const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { PREFIX, TOKEN_METEO_API } = require('../../configuration/config.js');

/**
 * Run de la commande meteo
 * @author Kévin Borderon	
 * @module meteo/run
 * @description ATTENTION aux villes homonymes dans le même pays, aucune solution ne permet de distinguer ces 2 villes (par exemple Plouhinec Morbihan et Plouhinec Finistère).
	Pour les villes homonymes dans 2 pays différents, il suffi d'indiquer ?meteo nom_ville, nom_pays comme par exemple ?meteo Vay, France et ?meteo Vay, Inde.
 * @param {Client} client - Référence au bot
 * @param {Message} message - Le message reçu par le bot
 * @param {Array.<String>} categorie - Les arguments du message
 */
module.exports.run = (client, message, args) => {
	/* Conditions météorologiques actuelle, demain et après-demain */
	var conditionsMeteos = new Array(3);  /* L'api gratuite, nous limite à 3 jours */

	/* Contenus du message que nous envoyons */
	var description = '';
	var description2 = '';

	/* Direction du vent */	
	var directionVent = '';

	/* Humidité */
	var humidite = '';

	/* Indicateur journée : jour ou nuit */
	var indicateurJournee = '';

	/* Nom du pays */
	var nomPays = '';

	/* Nom de la région */
	var nomRegion = '';

	/* Nom de la ville */
	var nomVille = '';

	/* Précipitation */
	var precipitation = '';

	/* Probabilités de précipitations pour aujourd'hui, demain et après-demain */
	var probabilitesPrecipitation = new Array(3); /* L'api gratuite, nous limite à 3 jours */
	
	/* Températures actuelle, pour demain et après demain */
	var temperatures = new Array(3); /* L'api gratuite, nous limite à 3 jours */

	/* Températures minimums pour aujourd'hui, demain et après-demain */
	var temperaturesMinimums = new Array(3); /* L'api gratuite, nous limite à 3 jours */

	/* Températures maximums pour aujourd'hui, demain et après-demain */
	var temperaturesMaximums = new Array(3); /* L'api gratuite, nous limite à 3 jours */

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
		const thermometreEmoji = message.guild.emojis.cache.get('721101554534580224'); // Lire README.md dans le dossier contenu/emojis
 
		/* Emoji ultraviolet */
		const uvEmoji = message.guild.emojis.cache.get('721101554865668207'); // Lire README.md dans le dossier contenu/emojis

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

				/* Actualisation des conditions météorologiques actuelle, demain et après-demain */
				conditionsMeteos[0] = donnees['current']['condition']['text'];														/* Condition météorologique actuelle */
				conditionsMeteos[1] = donnees['forecast']['forecastday'][1]['day']['condition']['text']; 	/* Condition météorologique demain */
				conditionsMeteos[2] = donnees['forecast']['forecastday'][2]['day']['condition']['text']; 	/* Condition météorologique après-demain */	

				/* Actualisation de l'humidité */
				humidite += donnees['current']['humidity'] + '%';
	
				/* Actualisation de l'indicateur de journée */
				indicateurJournee += donnees['current']['is_day'] === 1 ? 'jour' : 'nuit';

				/* Actualisation du nom du pays */
				nomPays += donnees['location']['country'];

				/* Actualisation du nom de la région */
				nomRegion += donnees['location']['region'];
			
				/* Actualisation du nom de la ville (au cas où on précise le pays dans la commande) */
				nomVille = donnees['location']['name'];

				/* Actualisation de la précipitation */
				precipitation += donnees['current']['precip_in'] + ' mm';

				/* Actualisation des probabilités de précipitation pour aujourd'hui, demain et après-demain */
				probabilitesPrecipitation[0] = donnees['forecast']['forecastday'][0]['day']['daily_chance_of_rain'] + '%';	/* Probabilité de précipitation pour aujourd'hui */
				probabilitesPrecipitation[1] = donnees['forecast']['forecastday'][1]['day']['daily_chance_of_rain'] + '%';	/* Probabilité de précipitation pour demain */
				probabilitesPrecipitation[2] = donnees['forecast']['forecastday'][2]['day']['daily_chance_of_rain'] + '%';	/* Probabilité de précipitation pour après-demain */

				/* Actualisation de l'émoji statut journée */
				statutJourneeEmoji = "jour" === indicateurJournee ? "🌇":"🌃";

				/* Actualisation de la température actuelle, pour demain et après-demain */
				temperatures[0] = donnees['current']['temp_c'] + "°C";
				temperatures[1] = donnees['forecast']['forecastday'][1]['day']['avgtemp_c'] + "°C";
				temperatures[2] = donnees['forecast']['forecastday'][2]['day']['avgtemp_c'] + "°C";		
		
				/* Actualisation de la température minimum pour aujourd'hui, pour demain et après-demain */
				temperaturesMinimums[0] = donnees['forecast']['forecastday'][0]['day']['mintemp_c'] + "°C";		/* Température minimum pour aujourd'hui */
				temperaturesMinimums[1] = donnees['forecast']['forecastday'][1]['day']['mintemp_c'] + "°C";		/* Température minimum pour demain */
				temperaturesMinimums[2] = donnees['forecast']['forecastday'][2]['day']['mintemp_c'] + "°C";		/* Température minimum pour après-demain */

				/* Actualisation de la température maximum pour aujourd'hui, pour demain et après-demain */
				temperaturesMaximums[0] = donnees['forecast']['forecastday'][0]['day']['maxtemp_c'] + "°C"; 	/* Température maximum pour aujourd'hui */
				temperaturesMaximums[1] = donnees['forecast']['forecastday'][1]['day']['maxtemp_c'] + "°C";		/* Température maximum pour demain */
				temperaturesMaximums[2] = donnees['forecast']['forecastday'][2]['day']['maxtemp_c'] + "°C";		/* Température maximum pour après-demain */

				/* Actualisation de la température ressentie */
				temperatureRessentie += donnees['current']['feelslike_c'] + "°C";

				/* Actualisation de l'ultraviolet */
				uv += donnees['current']['uv'];

				/* Actualisation du vent */
				vent += donnees['current']['wind_kph'] + ` km/h en provenance ${directionVent}`;

				/* Actualisation des descriptions */
				description += `**${nomVille}, ${nomRegion}, ${nomPays}**\nActuellement **${conditionsMeteos[0]}**, avec une température de ${temperatures[0]}.`;
				description2 += `**Demain :** La condition métorologique sera **${conditionsMeteos[1]}**, avec une température minimale de **${temperaturesMinimums[1]}**, maximale de **${temperaturesMaximums[1]}**. Il y aura une température moyenne de **${temperatures[1]}** et **${probabilitesPrecipitation[1]} de probabilité de précipitations**.\n`;
				description2 += `\n**Après-demain :** La condition métorologique sera **${conditionsMeteos[2]}**, avec une température minimale de **${temperaturesMinimums[2]}**, maximale de **${temperaturesMaximums[2]}**. Il y aura une température moyenne de **${temperatures[2]}** et **${probabilitesPrecipitation[2]} de probabilité de précipitations**.`;
					
				const contenu = new MessageEmbed()
				.setColor("#4fd0ea")
				.setTitle(`Météo ${nomVille}, ${nomPays}`)
				.setURL("https://www.weatherapi.com/")
				.setTimestamp()
				.setDescription(description)
				.addFields(
					{ name: `${jourNuitEmoji} Statut journée`, value: `${statutJourneeEmoji} ${indicateurJournee}`, inline: true},
					{ name: `${thermometreEmoji} Température min`, value: `${temperaturesMinimums[0]}`, inline: true}, 
					{ name: `${thermometreEmoji} Température max`, value: `${temperaturesMaximums[0]}`, inline: true},
					{ name: `${temperatureRessentieEmoji} Température ressentie`, value: `${temperatureRessentie}`, inline: true},
					{ name: `${humiditeEmoji} Humidité`, value: `${humidite}`, inline: true},
					{ name: `${ventEmoji} Vent`, value: `${vent}`, inline: true},
					{ name: `${probabilitePrecipitationEmoji} Probabilité de précipitations`, value: `${probabilitesPrecipitation[0]}`, inline: true},
					{ name: `${uvEmoji} Ultraviolet`, value: `${uv}`, inline: true},
					{ name: `${precipitationEmoji} Précipitation`, value: `${precipitation}`, inline: true},
					{ name: `**__Informations pour les 2 journées à venir__**`, value: `${description2}`}
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
 * @description ATTENTION aux villes homonymes dans le même pays, aucune solution ne permet de distinguer ces 2 villes (par exemple Plouhinec Morbihan et Plouhinec Finistère).
	Pour les villes homonymes dans 2 pays différents, il suffi d'indiquer ?meteo nom_ville, nom_pays comme par exemple ?meteo Vay, France et ?meteo Vay, Inde.
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
	description: 'Renvoie la météo pour une ville précise.',
	nom: 'meteo',
	utilisation: "<nom_ville> ou <nom_ville>, <nom_pays>"
};
