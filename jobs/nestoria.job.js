const request = require('request');
const NESTORIA_API = 'https://api.nestoria.es/api?encoding=json&pretty=1&action=search_listings&c…ing_type=buy&place_name=madrid';
mongoose = require('mongoose');
const Listing = require('../models/listing.model');

module.exports.run = () => {
    console.log("Starting Nestoria sync");
    for( let i = 1; i <= 200; i++) {        
        request.get(`${NESTORIA_API}&page=${i}`, (err, res, body) => {
            if (err) { console.log(err); }
            else {
                const data = JSON.parse(body);
                const listings = data.response.listings;
                for (let nestoriaListing of listings) {
                    const listing = {
                        title      : nestoriaListing.title || '',
                        description: nestoriaListing.summary || '',
                        home_type  : nestoriaListing.property_type || '',
                        price      : nestoriaListing.price_high || 0,
                        _owner     : nestoriaListing.datasource_name || '',
                        size       : nestoriaListing.size || 0,
                        bedrooms   : nestoriaListing.room_number || 0,
                        bathrooms  : nestoriaListing.bathroom_number || 0,
                        location: {
                            type: "Point",
                            coordinates: [nestoriaListing.latitude, nestoriaListing.longitude] || [],
                        } || {},
                        lister_name: nestoriaListing.lister_name || '',
                        lister_url:  nestoriaListing.lister_url || '',
                        images: nestoriaListing.img_url || ''
                        };

                        Listing.findOneAndUpdate(
                            { lister_url: listing.lister_url, _owner: listing._owner }, { '$set': listing }, { upsert: true })
                            .catch(err => console.log(err));
                };
            }
        });
    };
    console.log("End Nestoria sync"); 
}
