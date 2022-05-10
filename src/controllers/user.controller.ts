import {Request, Response} from 'express';
import userService from '../services/user.service';
import httpStatus from 'http-status';
import {IUser, IUserAuth} from '../interfaces/user.interface';

class UserController{
    constructor(){}

    //method to get all users
    public async GetUsers(req: Request, res: Response){
        try {
            const users = await userService.GetUsers();
            if(!users){
                return res
                .status(httpStatus.BAD_REQUEST)
                .json({msg: "Users Not Found"});
            }
            return res
            .status(httpStatus.OK)
            .json(users);

        } catch (error: any) {
            res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({success: false, message: error.message});
        }
    }
    
    //method signup
    public async SignUp(req: Request, res: Response){
        
        try {
            
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
        } catch (error: any) {
            res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({success: false, message: error.message});
        }
    }
    //Method that return a message of user deleted
    public async DeleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await userService.DeleteUser(id);
            if(!result){
              res.status(httpStatus.BAD_REQUEST);
              res.json({message: "Something went wrong when trying to delete"});
              return;
            }
            res.status(httpStatus.OK);
            res.json(result);
        } catch (error: any) {
            res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({success: false, message: error.message});
        }
    }

    //method signin
    public async SignIn(req: Request, res: Response){

        try {
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
            
        } catch (error: any) {
            res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({success: false, message: error.message});
        }
    }
}

const userController = new UserController();
export default userController;