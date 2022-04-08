import {Request, Response, Router} from 'express';

import Post from '../models/posts';

class PostRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.Routes();
    }
    
    //method to list all posts
    async GetPosts(req: Request, res: Response){
        const posts = await Post.find();
        res.json(posts);
    }
    //method to list one only post
    async GetPost(req: Request, res: Response){
        const post = await Post.findOne({url: req.params.url});
        res.json(post);
    }
    //method to create new post
    async CreatePost(req: Request, res: Response){
        const {title, url, content, image} = req.body;
        const newPost = new Post({title, url, content, image});
        await newPost.save();
        res.status(201);
        res.json({Data: newPost});
    }
    //method to update a post is already created duh jajaja!!
    async UpdatePost(req: Request, res: Response){
        const {url} = req.params;
        const post = await Post.findOneAndUpdate({url}, req.body, {new: true});
        res.json(post);
    }
    //method to delete a post
    async DeletePost(req: Request, res: Response){
        const {url} = req.params;
        await Post.findOneAndDelete({url});
        res.json({message: "Post deleted successfully"});
    }
    //method to do any route of this class
    Routes(){
        this.router.get('/', this.GetPosts);
        this.router.get('/:url', this.GetPost);
        this.router.post('/', this.CreatePost);
        this.router.put('/:url', this.UpdatePost);
        this.router.delete('/:url', this.DeletePost);

    }
}
const postRouter = new PostRouter();
postRouter.Routes();
export default postRouter.router;