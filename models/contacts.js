const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactShema = new Schema(
    {
        name: {type: String, require: true},
        telf: {type: Number, require: true},
        email: {type: String, require: true},
    },
    { collection: "contacts_db" }
);

const Contacts = mongoose.model("contacts_db", contactShema);
module.exports = Contacts;