const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../util/parseStringAsArray');

module.exports = {

    async show(req,res){
        const dev = await Dev.findById(req.params.id);

        return res.json(dev);
    },

    async index(req,res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = response.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }



        res.json(dev);

    },

    async update(req,res){
        const dev = await Dev.findByIdAndUpdate(req.params.id,req.body);

        return res.json(dev);
    },

    async destroy(req, res){
        await Dev.findByIdAndDelete(req.params.id);
        return res.json({result : true});
    }
}