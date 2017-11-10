const request = require('request');
const NESTORIA_API_Rent = 'https://api.nestoria.es/api?encoding=json&pretty=1&action=search_listings&country=es&listing_type=rent&place_name=madrid';
mongoose = require('mongoose');
const Listing = require('../models/renting.model');

module.exports.run = () => {
    console.log("Starting Nestoria Renting sync");
    for( let i = 1; i <= 200; i++) {        
        request.get(`${NESTORIA_API_Rent}&page=${i}`, (err, res, body) => {
            if (err) { console.log(err); }
            else {
                const data = JSON.parse(body);
                const renting = data.response.renting;
                for (let nestoriaRenting of renting) {
                    const renting = {
                        title      : nestoriaRenting.title || '',
                        description: nestoriaRenting.summary || '',
                        home_type  : nestoriaRenting.property_type || '',
                        price      : nestoriaRenting.price_high || 0,
                        _owner     : nestoriaRenting.datasource_name || '',
                        size       : nestoriaRenting.size || 0,
                        bedrooms   : nestoriaRenting.room_number || 0,
                        bathrooms  : nestoriaRenting.bathroom_number || 0,
                        location: {
                            type: "Point",
                            coordinates: [nestoriaRenting.latitude, nestoriaRenting.longitude] || [],
                        } || {},
                        lister_name: nestoriaRenting.lister_name || '',
                        lister_url:  nestoriaRenting.lister_url || '',
                        images: nestoriaRenting.img_url || ''
                        };

                        Renting.findOneAndUpdate(
                            { lister_url: renting.lister_url, _owner: renting._owner }, { '$set': renting }, { upsert: true })
                            .catch(err => console.log(err));
                };
            }
        });
    };
    console.log("End Nestoria sync"); 
}
