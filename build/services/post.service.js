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
const PostsRepo_1 = __importDefault(require("../repositories/PostsRepo"));
class PostsService {
    constructor() { }
    ;
    // Methods
    //Method that return all Posts
    GetPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield PostsRepo_1.default.GetPosts();
                if (!posts) {
                    return { success: false, message: "Posts Not Found" };
                }
                return posts;
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    //Method that return only one Post
    GetPost(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield PostsRepo_1.default.GetPost(url);
                if (!post) {
                    return { status: 404, message: "Posts Not Found" };
                }
                return post;
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    //Method to add new post
    AddPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = yield PostsRepo_1.default.CreatePost(post);
                return newPost;
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    //Method to Update a post
    UpdatePost(url, post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatePost = yield PostsRepo_1.default.UpdatePost(url, post);
                return { Data: updatePost, Message: "Post Updated Successfully" };
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    //Method to Delete a post
    DeletePost(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PostsRepo_1.default.DeletePost(url);
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
}
const postService = new PostsService();
exports.default = postService;
