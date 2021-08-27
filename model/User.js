// We creste a model to tell the database what properties our users should have while logging and signing in 
// require mongoose
const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true, 
        validate: [isEmail, 'Please enter a valid email']
    }, 
    password: {
        type: String, 
        required: [true, 'Please enter a password'],
        minlength: [5, 'Minimum password length is 5']
    }
})

// hash user's password
userSchema.pre('save', async function(next) {
    // create a salt to add to the hashed password
    const salt = await bcrypt.genSalt();
    // hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function(username, email, password) {
    // ensure username and email exists
    const user  = await this.findOne({username, email});
    
    //if it exists
    if(user) {
        // verify the password with the username and email then hash it
        const auth  = await bcrypt.compare(password, user.password);
        // if its correct
        if(auth) {
            return user;
        }throw new Error('incorrect password')

    }throw Error('incorrect details')
}

const User = mongoose.model('user', userSchema);

module.exports = User;