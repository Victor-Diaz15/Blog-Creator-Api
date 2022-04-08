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
const express_1 = require("express");
const posts_1 = __importDefault(require("../models/posts"));
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    //method to list all posts
    GetPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield posts_1.default.find();
            res.json(posts);
        });
    }
    //method to list one only post
    GetPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield posts_1.default.findOne({ url: req.params.url });
            res.json(post);
        });
    }
    //method to create new post
    CreatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = req.body;
            const newPost = new posts_1.default({ title, url, content, image });
            yield newPost.save();
            res.status(201);
            res.json({ Data: newPost });
        });
    }
    //method to update a post is already created duh jajaja!!
    UpdatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield posts_1.default.findOneAndUpdate({ url }, req.body, { new: true });
            res.json(post);
        });
    }
    //method to delete a post
    DeletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            yield posts_1.default.findOneAndDelete({ url });
            res.json({ message: "Post deleted successfully" });
        });
    }
    //method to do any route of this class
    Routes() {
        this.router.get('/', this.GetPosts);
        this.router.get('/:url', this.GetPost);
        this.router.post('/', this.CreatePost);
        this.router.put('/:url', this.UpdatePost);
        this.router.delete('/:url', this.DeletePost);
    }
}
const postRouter = new PostRouter();
postRouter.Routes();
exports.default = postRouter.router;
