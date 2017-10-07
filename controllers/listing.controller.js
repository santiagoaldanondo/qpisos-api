mongoose = require('mongoose');
const Listing = require('../models/listing.model');
const MAX_LISTING_RESULTS = 6;

module.exports.getAll = (req, res, next) => {
  const query = {}
  if (req.query.owner) {
    query._owner = req.query.owner;
  }
  let offset = 0;
  if (req.query.offset) {
    offset = Number(req.query.offset) + MAX_LISTING_RESULTS;
  }
  Listing.find(query)
    .limit(MAX_LISTING_RESULTS)
    .skip(offset)
    .then((listings) => res.status(200).json(listings))
    .catch((err) => next(err))
};

module.exports.get = (req, res, next) => {
  Listing.findById(req.params.id)
    .then((listing) => {
      if (listing) {
        res.status(200).json(listing)
      } else {
        res.status(404).json({ message: 'Listing not found' });
      }
    })
    .catch((err) => next(err))
};

module.exports.remove = (req, res, next) => {
  Listing.remove({ _id: req.params.id })
    .then(removed => {
      if (removed.result.n > 0) {
        res.status(204).json();
      } else {
        res.status(404).json();
      }
    })
    .catch(err => next(err));
}

module.exports.create = (req, res, next) => {
  Listing.create(req.body)
    .then(listing => res.status(201).json(listing))
    .catch(err => next(err));
}

module.exports.edit = (req, res, next) => {
  Listing.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(listing => {
      if (!listing) {
        res.status(404).json();
      } else {
        res.status(200).json(listing)
      }
    })
    .catch(err => next(err));
}

module.exports.getCompetence = (req, res, next) => {
  Listing.findById(req.params.id)
    .then((listing) => {
      if (listing) {
        
        res.status(200).json(listing)
      } else {
        res.status(404).json({ message: 'Listing not found' });
      }
    })
    .catch((err) => next(err))
};

