const express = require('express');
const comicController = require('../controllers/comicController');
const authController = require('../controllers/authController');
const router = express.Router();
router
  .route('/')
  .get(comicController.getAllComics)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    comicController.createComic
  );

router
  .route('/:id')
  .get(comicController.getComic)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    comicController.updateComic
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    comicController.deleteComic
  );

module.exports = router;
