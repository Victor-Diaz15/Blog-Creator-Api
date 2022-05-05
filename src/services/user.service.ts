import userRepository from '../repositories/user.repository';
import {IUser} from '../interfaces/user.interface';

class UserService{
    constructor(){}
    
    //method
    public async UserExist(email: string){
        const userExist = await userRepository.UserExist(email);
        if(userExist){
            return true;
        }
        else{
            return false;
        }
    }
    //method sign up for new users
    public async SignUp(user: IUser){
        const newUser = await userRepository.SignUp(user);
        return newUser;
    }
}

const userService = new UserService();
export default userService;