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
const http_status_1 = __importDefault(require("http-status"));
const post_service_1 = __importDefault(require("../services/post.service"));
class PostController {
    constructor() { }
    // Methods
    //Method that return all Posts
    GetPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Posts = yield post_service_1.default.GetPosts();
                res.status(http_status_1.default.OK);
                res.json(Posts);
            }
            catch (error) {
                res
                    .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                    .send({ success: false, message: error.message });
            }
        });
    }
    //Method that return only one Post
    GetPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = req.params.url;
                const Post = yield post_service_1.default.GetPost(url);
                res.status(http_status_1.default.OK);
                res.json(Post);
            }
            catch (error) {
                res
                    .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                    .send({ success: false, message: error.message });
            }
        });
    }
    //Method that return the new Post Created
    AddPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = req.body;
                const result = yield post_service_1.default.AddPost(newPost);
                res.status(http_status_1.default.CREATED);
                res.json(result);
            }
            catch (error) {
                res
                    .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                    .send({ success: false, message: error.message });
            }
        });
    }
    //Method that return the updated post
    UpdatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = req.params.url;
                const post = req.body;
                const updatedPost = yield post_service_1.default.UpdatePost(url, post);
                res.status(http_status_1.default.OK);
                res.json(updatedPost);
            }
            catch (error) {
                res
                    .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                    .send({ success: false, message: error.message });
            }
        });
    }
    //Method that return a message of post deleted
    DeletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = req.params.url;
                const result = yield post_service_1.default.DeletePost(url);
                res.status(http_status_1.default.OK);
                res.json(result);
            }
            catch (error) {
                res
                    .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                    .send({ success: false, message: error.message });
            }
        });
    }
}
const postController = new PostController();
exports.default = postController;
