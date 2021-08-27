// import our user model
const User = require('../model/User');
const jwt = require('jsonwebtoken')

// error functions to send back our error messages
const handleErrors = (err) => {
    console.log(err.message, err.body);
    let error = {username: '', email: '', password: ''}

    // login error for email and username
    if(err.message === 'incorrect details') {
        error.username = 'this username is not registered'
        error.email = 'this email is not registered'
    }
    
    if(err.message === 'incorrect password') {
        error.password = 'this password is not correct'
    }

      // if there is a duplicate details
      if(err.code === 11000) {
        error.email = 'this email is already in use';
        return error;
    }

    if(err.message.includes("user validation failed")) {
        // validate errors for username, email, password
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message;
            console.log(error.properties)
    });
    }

    return error;
}

// create a jwt signup
const maxAge = 1000 * 60 * 60 * 24;
const createToken = (id) => {
    return jwt.sign({id}, 'Taofiq secret', {
        expiresIn: maxAge
    })
}

// create all our route controllers here
module.exports.signup_get = (req, res) => {
    res.render('signup', {title: 'Signup'})
};
module.exports.login_get = (req, res) => {
    res.render('login', {title: 'Login'})
};
module.exports.signup_post = async (req, res) => {
    // we get object with email and password properties, then we destructure these two props
    const {username, email, password} = req.body;
    
    try {
        const user = await User.create({username, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
        res.status(201).json({user: user._id});
    } catch (err) {
        const error = handleErrors(err);
        res.status(400).json({error})
    }
};


module.exports.login_post = async(req, res) => {

    // we get object with email and password properties, then we destructure these two props
    const {username, email, password} = req.body;

    try {
        const user = await User.login(username, email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
        res.status(201).json({user: user._id});
    } catch (err) {
        const error = handleErrors(err);
        res.status(400).json({error})
    }
    
};