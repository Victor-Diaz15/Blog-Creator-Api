import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

class UserRepository{
    construtor(){}
    
    //method
    public async UserExist(email: string){
        try {
            return await User.findOne({email: email});
        } catch (error) {
            throw error;
        }
    }
    //method sign up for new users
    public async SignUp(user: IUser){
        try {
            const {first_name, last_name, email, password, posts} = user;
            const newUser = new User({first_name, last_name, email, password, posts});
            return await newUser.save();
        } catch (error) {
            throw error;
        }
    }

    public async SignIn(email: string, password: string){
        const userExist = await this.UserExist(email);

    }
}

const userRepository = new UserRepository();
export default userRepository;