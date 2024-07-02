const { Router } = require('express');

const { getTags } = require('../controllers/tag');

const tagRouter= Router();

tagRouter.get('/', getTags);


module.exports = tagRouter;