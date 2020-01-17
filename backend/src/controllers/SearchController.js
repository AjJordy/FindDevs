const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	async index(req, resp) {
		// Buscar todos devs num raio de 10km
		// Filtrar por tecnologias
		console.log(req.query);

		const {latitude, longitude, techs} = req.query;
		const techsArray = parseStringAsArray(techs);

		// Filtro da busca
		// Mongo Operators
		const devs = await Dev.find({
			techs: {
				$in: techsArray, 
			},
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [longitude, latitude],
					},
					$maxDistance: 10000,
				},
			},
		});

		console.log(devs);
		return resp.json({ devs });
	}
}