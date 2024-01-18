const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');

router.use('/', homeRoutes);
router.use('/', postRoutes)

module.exports = router;
