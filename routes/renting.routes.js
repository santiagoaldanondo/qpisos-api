var express = require('express');
var router = express.Router();

const renting = require('../controllers/renting.controller');

router.get('/', renting.getAll);
router.get('/:id', renting.get);
router.post('/', renting.create);
router.put('/:id', renting.edit);
router.delete('/:id', renting.remove);
router.get('/:id/competence', renting.getCompetence);

module.exports = router;