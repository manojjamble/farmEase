const express = require('express');
const router = express.Router();
const {getImgs, getImg, createImg, deleteImg} = require('../controllers/imageController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.get('/all', getImgs);
router.get('/', getImg);
router.post('/', upload.array('avatar'), createImg);
router.delete('/', deleteImg);

module.exports = router;