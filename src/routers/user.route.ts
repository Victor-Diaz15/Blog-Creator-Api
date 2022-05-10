import {Router} from 'express';
import userController from '../controllers/user.controller';

class UserRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.Routes();
    }
    
    Routes(){
        this.router.get('/user', userController.GetUsers);
        this.router.post('/user/signup', userController.SignUp);
        this.router.post('/user/signin', userController.SignIn);
        this.router.delete('/user/:id', userController.DeleteUser);
    }
}
const userRouter = new UserRouter();
userRouter.Routes();
export default userRouter.router;