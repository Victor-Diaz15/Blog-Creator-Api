"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//creating a schema for the database
const PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: String,
    createAt: { type: Date, default: Date.now },
    updatedAt: Date
});
//exporting model of Post
exports.default = (0, mongoose_1.model)('Post', PostSchema);
