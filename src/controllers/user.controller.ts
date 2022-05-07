import {Request, Response} from 'express';
import userService from '../services/user.service';
import httpStatus from 'http-status';
import {IUser, IUserAuth} from '../interfaces/user.interface';

class UserController{
    constructor(){}

    public async SignUp(req: Request, res: Response){
        
        const newUser: IUser = req.body;
        
        if(!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.password){
            return res
            .status(httpStatus.BAD_REQUEST)
            .json({msg: "Please send all field"});
        }
        const userExist = await userService.UserExist(newUser.email);
        if (userExist) {
            return res
            .status(httpStatus.BAD_REQUEST)
            .json({msg: "The user already exists"});
        }

        const result = await userService.SignUp(newUser);
        return res
        .status(httpStatus.OK)
        .json(result);
    }

    //method signin
    public async SignIn(req: Request, res: Response){
        const user: IUserAuth = req.body;
        const userExist = await userService.UserExist(user.email);
        if(userExist){
            const userAuth = await userService.SignIn(user, userExist.password);
            if(!userAuth){
                return res
                .status(httpStatus.UNAUTHORIZED)
                .json({msg: "The password or email does not match"});
            }
            return res
            .status(httpStatus.OK)
            .json({token: userAuth});
        }
        return res
        .status(httpStatus.BAD_REQUEST)
        .json({msg: "The user does not exist!"});
    }
}

const userController = new UserController();
export default userController;