import Post from '../models/posts';
import { IPosts } from '../interfaces/posts.interface';

class PostsRepository{
    constructor(){}

    //Methods

    //method to list all posts
    public async GetPosts(){
        const posts = await Post.find();
        return posts;
    }
    //method to list one only post
    public async GetPost(url: string){
        const post = await Post.findOne({url: url});
        return post;
    }
    //method to create new post
    public async CreatePost(post: IPosts){
        const {title, url, content, image} = post;
        const newPost = new Post({title, url, content, image});
        return await newPost.save();
    }
    //method to update a post is already created duh jajaja!!
    public async UpdatePost(url: string, post: IPosts){
        return await Post.findOneAndUpdate({url}, post);
    }
    //method to delete a post
    public async DeletePost(url: string){
        await Post.findOneAndDelete({url: url});
        return {success: true, message: "Post Deleted Successfully"};
    }

}
const postRepository = new PostsRepository();
export default postRepository;