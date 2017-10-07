var express = require('express');
var router = express.Router();

const listing = require('../controllers/listing.controller');

router.get('/', listing.getAll);
router.get('/:id', listing.get);
router.post('/', listing.create);
router.put('/:id', listing.edit);
router.delete('/:id', listing.remove);
router.get('/:id/competence', listing.getCompetence);

module.exports = router;