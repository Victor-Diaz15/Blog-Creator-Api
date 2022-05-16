import {Router} from 'express';
import userController from '../controllers/user.controller';
import passport from 'passport';
class UserRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.Routes();
    }
    
    Routes(){
        this.router.get('/user', passport.authenticate("jwt", { session: false }), userController.GetUsers);
        this.router.post('/user/signup', userController.SignUp);
        this.router.post('/user/signin', userController.SignIn);
        this.router.delete('/user/:id', passport.authenticate("jwt", { session: false }), userController.DeleteUser);
    }
}
const userRouter = new UserRouter();
userRouter.Routes();
export default userRouter.router;