import userRepository from '../repositories/user.repository';
import {IUser, IUserAuth} from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class UserService{
    constructor(){}
    
    //method
    public async UserExist(email: string){
        const userExist = await userRepository.UserExist(email);
        if(userExist){
            return userExist;
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
    
    //method sign in for auth
    public async SignIn(user: IUserAuth, hash: string){
        try {
            const isMatch = await this.ComparePassword(user.password, hash);
            if(isMatch){
                return this.CreateToken(user);
            }
            return false;
        } catch (error) {
            throw error;
        }
    }
    //method to compare the password
    private async ComparePassword(password: string, hash: string){
        return await bcrypt.compare(password, hash);
    }
    //method to create the token
    private CreateToken(user: IUserAuth){
        const jwtSecret: string =  process.env.JWT_SECRET || 'somesecrettoken';
        const token: string = jwt.sign({email: user.email}, jwtSecret, {
            expiresIn: 60*60
        });
        return token;
    }
}

const userService = new UserService();
export default userService;