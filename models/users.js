const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema(
    {
        name: {type: String, require: true},
        email: {type: String, unique: true, require: true},
        adress: {type: String },
        password: {type: String, require: true},
        relator: [{type: Schema.Types.ObjectId, ref: 'users_db'}]
    },
    { collection: "users_db" }
);

const Users = mongoose.model("users_db", userShema);
module.exports = Users;