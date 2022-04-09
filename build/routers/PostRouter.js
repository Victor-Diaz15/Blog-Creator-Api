"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.get('/', post_controller_1.default.GetPosts);
        this.router.get('/:url', post_controller_1.default.GetPost);
        this.router.post('/', post_controller_1.default.AddPost);
        this.router.put('/:url', post_controller_1.default.UpdatePost);
        this.router.delete('/:url', post_controller_1.default.DeletePost);
    }
}
const postRouter = new PostRouter();
postRouter.Routes();
exports.default = postRouter.router;
