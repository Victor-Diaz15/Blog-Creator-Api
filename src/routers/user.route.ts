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
    }
}
const userRouter = new UserRouter();
userRouter.Routes();
export default userRouter.router;