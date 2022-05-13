import Post from "../models/post.model";
import { IPost } from "../interfaces/post.interface";
import { ObjectId } from "mongodb";


class PostsRepository {
  constructor() {}

  //Methods

  //method for check if a url exists
  public async UrlExist(url: string){
    try {
      return await Post.findOne({url: url});
    } catch (error) {
      throw error;
    }
}

  //method to list all posts
  public async GetPosts() {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      throw error;
    }
  }
  //method to list one only post
  public async GetPost(id: string) {
    try {
      const post = await Post.findOne({ _id: new ObjectId(id) }, {createAt: 0});
      return post;
    } catch (error) {
      throw error;
    }
  }
  //method to create new post
  public async CreatePost(post: IPost) {
    try {
      const { title, url, content, image } = post;
      const newPost = new Post({ title, url, content, image });
      return await newPost.save();
    } catch (error) {
      throw error;
    }
  }
  //method to update a post is already created duh jajaja!!
  public async UpdatePost(id: string, post: IPost) {
    try {
      let res = await Post.findOneAndUpdate({ _id: new ObjectId(id) }, post);
      return res;
    } catch (error) {
      throw error;
    }
  }
  //method to delete a post
  public async DeletePost(id: string) {
    try {
      let res = await Post.findOneAndDelete({ _id: new ObjectId(id) });
      return res;
    } catch (error) {
      throw error;
    }
  }
}
const postRepository = new PostsRepository();
export default postRepository;
