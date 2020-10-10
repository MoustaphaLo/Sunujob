const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imageName: {
        type: String,
        default: "none",
        required: false
    },
    imageData: {
        type: String,
        required: false
    }
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;