import {Request, Response} from 'express';
import userService from '../services/user.service';
import httpStatus from 'http-status';
import {IUser} from '../interfaces/user.interface';

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
}

const userController = new UserController();
export default userController;