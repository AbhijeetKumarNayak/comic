const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');
const comicController = require('../controllers/comicController');

const router = express.Router();
router.get('/',authController.isLoggedIn,viewsController.getProducts);
router.get('/getcomic/:slug',authController.isLoggedIn,viewsController.getComic);
router.get('/getcomics',authController.isLoggedIn,viewsController.getcomics);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.isLoggedIn,authController.protect, viewsController.getAccount);
router.get('/logout', authController.logout);
router.get('/reset',viewsController.reset);
router.get('/recover',viewsController.recover);
router.get('/resetPassword/:token',viewsController.getsetpassword);
router.get('/createuser',authController.isLoggedIn,viewsController.createuser);
router.get('/deleteuser',authController.isLoggedIn,viewsController.getdeleteuser);
router.get('/deletepost',authController.isLoggedIn,viewsController.getdeletepost);
router.get('/createpost',authController.isLoggedIn,viewsController.createpost);
router.get('/category/subcategory/:sub',viewsController.getCategory);
router.get('/publish',viewsController.publish);
router.post('/resetPassword/:token',authController.resetPassword);
router.post('/forgotPassword',authController.forgotPassword);
router.post('/createuser', authController.createuser);
router.post('/deleteuser',viewsController.deleteuser);
router.post('/deletepost',viewsController.deletepost);
router.patch('/updateuser',viewsController.updateuser);
router.post('/upload',viewsController.upload);
router.post('/signup', authController.signup);

// router.post('/createcomment',viewsController.createcomment);
router.post('/createcomment/:id',viewsController.createcomment);

module.exports = router;