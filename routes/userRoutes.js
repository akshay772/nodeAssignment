const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Clean files by separating routers to other files
// For that create one basic Router for each of resource
// ie one for tours and one for users
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
