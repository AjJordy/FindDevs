const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Tipos de parâmetros
// Query Params: request.query  (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)


// async: Indica que essa função pode demorar a responder
// awayt: Indique onde deve esperar responder 

// index: Mostrar uma lista
// show: Mostrar um único
// store: Criar
// update: Alterar
// destroy: Deletar

module.exports = {

	async index(req, resp) {
		const devs = await Dev.find();
		return resp.json(devs);
	},

	async store (req, resp) {
		const { github_username, techs, latitude, longitude } = req.body; // Recebe os campos do corpo da requisição
		let dev = await Dev.findOne({github_username});
		if (!dev){
			const response = await axios.get(`https://api.github.com/users/${github_username}`); // Consulta a API do github
			const { name = login, avatar_url, bio } = response.data; // Recebe os campos recebidos da API
			const techsArray = parseStringAsArray(techs); // Separa nas virgulas e remove os espaçoes
			console.log(name, avatar_url, bio);

			const location = {
				type: 'Point',
				coordinates: [longitude, latitude],
			}

			dev = await Dev.create({ // Cria o objeto para ser salvo no bando de dados
				github_username,
				name,
				avatar_url,
				bio,
				techs: techsArray,
				location,
			});
		}

		return resp.json(dev);
	},    

	async update(){
		// TODO:
	},

	async destroy(){
		// TODO:
	}
}