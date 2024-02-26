var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    firstName:String,
    email:String,
    lastName:String,
    password:String,
    role:{type:String,default:'utilisateur'},
    age:{type:Number,default:0}
})


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.create = function(signUpUserData) {
    var newUser = new this();
    newUser.email = signUpUserData.email.toLowerCase();
    newUser.firstName = signUpUserData.firstName;
    newUser.lastName = signUpUserData.lastName;
    newUser.age = signUpUserData.age;
    newUser.password = newUser.generateHash(signUpUserData.password);

    if (signUpUserData.role) {
        newUser.role = signUpUserData.role;
    }

    // return the Promise
    return newUser.save()
}

module.exports = mongoose.model('User', userSchema);
