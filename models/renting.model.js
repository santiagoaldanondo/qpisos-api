const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const RentingSchema = new Schema({
  title       : { type: String, required: true },
  description : String,
  home_type   : { type: String, required: true },
  price       : { type: Number, required: true },
  _owner      : { type: String, required: true },
  size        : { type: Number, required: true},
  bedrooms    : { type: Number, required: true, default: 0},
  bathrooms   : { type: Number, required: true},
  location    : { 
    type: {
      type: String
    },
    coordinates: [Number]
  },
  lister_name: { type: String, require: true },
  lister_url: { type: String, require: true },
  images: { type: [String]}
});

RentingSchema.methods.belongsTo = function(user){
  return this._owner.equals(user._id);
};

RentingSchema.index({ location: '2dsphere' });

const Renting = mongoose.model('Renting', RentingSchema);

module.exports = Renting;
