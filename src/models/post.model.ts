import {Schema, model} from 'mongoose';

//creating a schema for the database
const PostSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true, unique: true, lowercase: true},  
    content: {type: String, required: true},
    image: String,
    createAt: {type: Date, default: Date.now},
    updatedAt: Date
});

//exporting model of Post
export default model('Post', PostSchema);