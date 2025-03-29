var express = require('express');
var path = require('path');

const router = express.Router();
const pages = path.join(__dirname, '../pages',)

router.use(express.static(path.join(__dirname, '../functions')));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(pages, 'index.html'));
});

module.exports = router;