
var Sequelize = require('sequelize');

var attributes = {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9\_\-]+$/i
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cohort: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;

//UserSchema.pre('save', function(next){
//    var user = this;
//
//    if(!user.isModified('password')) return next;
//
//    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//        if(err) return next(err);
//
//        bcrypt.hash(user.password, salt, function(err, hash){
//            if(err) return next(err);
//
//            user.password = hash;
//            next();
//        });
//    });
//});
//
//UserSchema.methods.comparePassword = function(candidatePassword, cb){
//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//        if(err) return cb(err);
//        cb(null, isMatch);
//    });
//};
//
//module.exports = mongoose.model('User', UserSchema);
//


//var mongoose = require('mongoose');
//
//var Schema = mongoose.Schema;



//var UserSchema = new Schema({
//    username: {type: String, required: true, index: {unique: true}},
//    password: {type: String, required: true},
//    firstName: {type: String, required: true},
//    lastName: {type: String, required: true},
//    email: {type: String, required: true},
//    role: {type: String, required: true},
//    cohort: {type: String, required: false}
//});
