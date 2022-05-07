import {Router} from 'express';
import userController from '../controllers/user.controller';

class UserRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.Routes();
    }
    
    Routes(){
        this.router.post('/signup', userController.SignUp);
        this.router.post('/signin', userController.SignIn);
    }
}
const userRouter = new UserRouter();
userRouter.Routes();
export default userRouter.router;