import { Request, Response } from "express";
import httpStatus from 'http-status';
import postService from "../services/post.service";
import { IPosts } from "../interfaces/posts.interface";

class PostController {
  constructor() {}

  // Methods

  //Method that return all Posts
  public async GetPosts(req: Request, res: Response) {
    try {
        const Posts = await postService.GetPosts();
        res.status(httpStatus.OK);
        res.json(Posts);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message})
    }
  }

  //Method that return only one Post
  public async GetPost(req: Request, res: Response) {
    try {
        const url = req.params.url;
        const Post = await postService.GetPost(url);
        res.status(httpStatus.OK);
        res.json(Post);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message})
    }
  }

  //Method that return the new Post Created
  public async AddPost(req: Request, res: Response) {
    try {
        const newPost: IPosts = req.body;
        const result = await postService.AddPost(newPost);
        res.status(httpStatus.CREATED);
        res.json(result);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message})
    }
  }

  //Method that return the updated post
  public async UpdatePost(req: Request, res: Response) {
    try {
        const url = req.params.url;
        const post: IPosts = req.body;
        const updatedPost = await postService.UpdatePost(url, post);
        res.status(httpStatus.OK);
        res.json(updatedPost);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message})
    }
  }

  //Method that return a message of post deleted
  public async DeletePost(req: Request, res: Response) {
    try {
        const url = req.params.url;
        const result = await postService.DeletePost(url);
        res.status(httpStatus.OK);
        res.json(result);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message})
    }
  }
}
const postController = new PostController();
export default postController;
