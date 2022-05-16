import {Router} from 'express';
import postController from '../controllers/post.controller';
import passport from 'passport';
class PostRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.Routes();
    }
    
    Routes(){
        this.router.get('/', postController.GetPosts);
        this.router.get('/:id', postController.GetPost);
        this.router.post('/', passport.authenticate("jwt", { session: false }), postController.AddPost);
        this.router.put('/:id', passport.authenticate("jwt", { session: false }), postController.UpdatePost);
        this.router.delete('/:id', passport.authenticate("jwt", { session: false }), postController.DeletePost);

    }
}
const postRouter = new PostRouter();
postRouter.Routes();
export default postRouter.router;