const express = require('express');
const router = express.Router();
const {getUsers, getUser, loginUser, createUser, updateUser, deleteUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/login', loginUser);
router.post('/', createUser);

router.use(validateToken);

router.get('/all', getUsers);
router.get('/', getUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;

