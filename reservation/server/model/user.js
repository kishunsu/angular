const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// const HeadingSchema = new Schema({
//     name:String,
//     description: String
// })

const UserScnema = new Schema({
    username: {
        type: String,
        required: true,
        max: [60, 'ユーザ名は最大60文字までです']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: [60, 'Emailは最大60文字までです']
    },
    password: {
        type: String, required: true,
        min: [6, 'パスワードは6文字以上で入力してください'],
        max: [30, 'パスワードは最大30文字までです']
    },

});

UserScnema.methods.hasSamePassword = function (inputPassword) {
    const user = this;
    return bcrypt.compareSync(inputPassword,user.password);

}


UserScnema.pre('save', function (next) {
    const user = this;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            next();


        });
    });
})

module.exports = mongoose.model('User', UserScnema)
