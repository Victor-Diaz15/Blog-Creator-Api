"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = __importDefault(require("../models/posts"));
class PostsRepository {
    constructor() { }
    //Methods
    //method to list all posts
    GetPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield posts_1.default.find();
            return posts;
        });
    }
    //method to list one only post
    GetPost(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield posts_1.default.findOne({ url: url });
            return post;
        });
    }
    //method to create new post
    CreatePost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = post;
            const newPost = new posts_1.default({ title, url, content, image });
            return yield newPost.save();
        });
    }
    //method to update a post is already created duh jajaja!!
    UpdatePost(url, post) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_1.default.findOneAndUpdate({ url }, post);
        });
    }
    //method to delete a post
    DeletePost(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield posts_1.default.findOneAndDelete({ url: url });
            return { success: true, message: "Post Deleted Successfully" };
        });
    }
}
const postRepository = new PostsRepository();
exports.default = postRepository;
