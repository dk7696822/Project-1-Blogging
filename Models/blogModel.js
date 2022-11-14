const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    SubCategory: {
        type: [String],
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    publishAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {timestamps: true});

module.exports = mongoose.model("Blogs", BlogSchema);