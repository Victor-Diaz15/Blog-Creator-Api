import postsRepository from "../repositories/PostsRepo";
import { IPosts } from "../interfaces/posts.interface";

class PostsService{
    constructor(){};

    // Methods
    
    //Method that return all Posts
    public async GetPosts(){
        try {
            const posts = await postsRepository.GetPosts();
            if (!posts) {
                return {success: false, message: "Posts Not Found"};
            }
            return posts;
        } catch (error: any) {
            return {success: false, message: error.message};
        }
    }

    //Method that return only one Post
    public async GetPost(url:string){
        try {
            const post = await postsRepository.GetPost(url);
            if (!post) {
                return {status: 404, message: "Posts Not Found"};
            }
            return post;
            
        } catch (error: any) {
            return {success: false, message: error.message};
        }
        
    }

    //Method to add new post
    public async AddPost(post: IPosts){
        try {
            const newPost = await postsRepository.CreatePost(post);
            return newPost;
        } catch (error: any) {
            return {success: false, message: error.message};
        }
    }

    //Method to Update a post
    public async UpdatePost(url: string, post: IPosts){
        try {
            const updatePost = await postsRepository.UpdatePost(url, post);
            return {Data: updatePost, Message: "Post Updated Successfully"}
        } catch (error: any) {
            return {success: false, message: error.message};
        }
    }

    //Method to Delete a post
    public async DeletePost(url: string){
        try {
            return await postsRepository.DeletePost(url);
        } catch (error: any) {
            return {success: false, message: error.message};
        }
        
    }
}

const postService = new PostsService();
export default postService;