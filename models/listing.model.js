const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const ListingSchema = new Schema({
  title       : { type: String, required: true },
  description : String,
  home_type   : { type: String, required: true },
  price       : { type: Number, required: true },
  _owner      : { type: String, required: true },
  size        : { type: Number, required: true},
  bedrooms    : { type: Number, required: true, default: 0},
  bathrooms   : { type: Number, required: true},
  location    : { 
    lat: Number,
    long: Number,
    accurance: Number
  },
  lister_name: { type: String, require: true },
  lister_url: { type: String, require: true },
  images: { type: [String]}
});

ListingSchema.methods.belongsTo = function(user){
  return this._owner.equals(user._id);
};
ListingSchema.index({ location: '2dsphere' });


const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
