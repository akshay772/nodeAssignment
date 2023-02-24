const express = require('express');
const userTourController = require('../controllers/userTourController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, userTourController.getAllUserTours)
  .post(authController.protect, userTourController.createUserTour);

router
  .route('/:id')
  .get(authController.protect, userTourController.getUserTour)
  .patch(authController.protect, userTourController.updateUserTour)
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    userTourController.deleteUserTour
  );

module.exports = router;
