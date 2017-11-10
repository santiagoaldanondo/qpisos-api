mongoose = require('mongoose');
const Renting = require('../models/renting.model');
const MAX_RENTING_RESULTS = 6;
const MAX_COMPETENCE_METERS = 500;

module.exports.getAll = (req, res, next) => {
  const query = {}
  if (req.query.owner) {
    query._owner = req.query.owner;
  }
  let offset = 0;
  if (req.query.offset) {
    offset = Number(req.query.offset) + MAX_RENTING_RESULTS;
  }
  Renting.find(query)
    .limit(MAX_RENTING_RESULTS)
    .skip(offset)
    .then((rentings) => res.status(200).json(rentings))
    .catch((err) => next(err))
};

module.exports.get = (req, res, next) => {
  Renting.findById(req.params.id)
    .then((renting) => {
      if (renting) {
        res.status(200).json(renting)
      } else {
        res.status(404).json({ message: 'Renting not found' });
      }
    })
    .catch((err) => next(err))
};

module.exports.remove = (req, res, next) => {
  Renting.remove({ _id: req.params.id })
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
  Renting.create(req.body)
    .then(renting => res.status(201).json(renting))
    .catch(err => next(err));
}

module.exports.edit = (req, res, next) => {
  Renting.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(renting => {
      if (!renting) {
        res.status(404).json();
      } else {
        res.status(200).json(renting)
      }
    })
    .catch(err => next(err));
}

module.exports.getCompetence = (req, res, next) => {
  Renting.findById(req.params.id)
    .then((renting) => {
      if (renting) {
        let query = {
          location: {
            $near: {
              $geometry: {
                 type : "Point",
                 coordinates: renting.location.coordinates
              },
              $maxDistance: MAX_COMPETENCE_METERS
            }
          }
        };
        Renting.find(query)
          .then((rentings) => res.status(200).json(rentings))
          .catch((err) => next(err))
      } else {
        res.status(404).json({ message: 'Renting not found' });
      }
    })
    .catch((err) => next(err))
};

