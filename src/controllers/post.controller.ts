import { Request, Response } from "express";
import httpStatus from 'http-status';
import postService from "../services/post.service";
import { IPost } from "../interfaces/post.interface";

class PostController {
  constructor() {}

  // Methods

  //Method that return all Posts
  public async GetPosts(req: Request, res: Response) {
    try {
        const posts = await postService.GetPosts();
        if (posts) {
          res.status(httpStatus.OK);
          res.json(posts);
          return;
        }
        res.status(httpStatus.NOT_FOUND);
        res.json({message: "Posts Not Found"});
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message});
    }
  }

  //Method that return only one Post
  public async GetPost(req: Request, res: Response) {
    try {
        let id = req.params.id;
        const Post = await postService.GetPost(id);
        if (!Post) {
          res.status(httpStatus.NOT_FOUND);
          res.json({message: "Post Not Found"});
          return;
        }
        res.status(httpStatus.OK);
        res.json(Post);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message});
    }
  }

  //Method that return the new Post Created
  public async AddPost(req: Request, res: Response) {
    try {
        const newPost: IPost = req.body;
        const urlExist = await postService.UrlExist(newPost.url);
        if(urlExist){
          return res
            .status(httpStatus.BAD_REQUEST)
            .json({msg: "The url already exists"});
        }
        const result = await postService.AddPost(newPost);
        if(!result){
          res.status(httpStatus.BAD_REQUEST);
          res.json({message: "Something went wrong!!"});
          return;
        }
        res.status(httpStatus.CREATED);
        res.json(result);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message});
    }
  }

  //Method that return the updated post
  public async UpdatePost(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const post: IPost = req.body;
        const updatedPost = await postService.UpdatePost(id, post);
        if(!updatedPost){
          res.status(httpStatus.BAD_REQUEST);
          res.json({message: "Something went wrong when trying to update"});
          return;
        }
        res.status(httpStatus.OK);
        return res.json(updatedPost);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message});
    }
  }

  //Method that return a message of post deleted
  public async DeletePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
        const result = await postService.DeletePost(id);
        if(!result){
          res.status(httpStatus.BAD_REQUEST);
          res.json({message: "Something went wrong when trying to delete"});
          return;
        }
        res.status(httpStatus.OK);
        res.json(result);
    } catch (error: any) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({success: false, message: error.message});
    }
  }
}
const postController = new PostController();
export default postController;
