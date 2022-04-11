import Post from '../models/posts';
import { IPost } from '../interfaces/posts.interface';

class PostsRepository{
    constructor(){}

    //Methods

    //method to list all posts
    public async GetPosts(){
        try {
            const posts = await Post.find();
            return posts;
        } catch (error) {
            throw error;
        }
    }
    //method to list one only post
    public async GetPost(url: string){
        try {
            const post = await Post.findOne({url: url});
            return post;
        } catch (error) {
            throw error;
        }
    }
    //method to create new post
    public async CreatePost(post: IPost){
        try {
            const {title, url, content, image} = post;
            const newPost = new Post({title, url, content, image});
            return await newPost.save();
        } catch (error) {
            throw error;
        }
    }
    //method to update a post is already created duh jajaja!!
    public async UpdatePost(url: string, post: IPost){
        try {
            await Post.findOneAndUpdate({url}, post);
        } catch (error) {
            throw error;
        }
    }
    //method to delete a post
    public async DeletePost(url: string){
        try {
            await Post.findOneAndDelete({url: url});
        } catch (error) {
            throw error;
        }
    }
}
const postRepository = new PostsRepository();
export default postRepository;