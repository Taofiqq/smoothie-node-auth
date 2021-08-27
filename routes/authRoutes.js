// require the route module from express
const { Router } = require('express');

// store in a constant
const router  = Router();

// require the auth controller
const authController = require('../controller/authController')
// We will have 4 routes, get route for (SIGN IN AND LOGIN) and post route for (SIGNUP AND LOGIN)
router.get('/signup', authController.signup_get);
router.get('/login', authController.login_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);


// export the route module to be imported to the app file
module.exports = router;
