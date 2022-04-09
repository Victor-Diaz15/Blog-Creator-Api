import {Router} from 'express';

import postController from '../controllers/post.controller';

class PostRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.Routes();
    }
    
    Routes(){
        this.router.get('/', postController.GetPosts);
        this.router.get('/:url', postController.GetPost);
        this.router.post('/', postController.AddPost);
        this.router.put('/:url', postController.UpdatePost);
        this.router.delete('/:url', postController.DeletePost);

    }
}
const postRouter = new PostRouter();
postRouter.Routes();
export default postRouter.router;