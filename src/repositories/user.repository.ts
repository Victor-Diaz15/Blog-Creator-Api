import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { ObjectId } from "mongodb";

class UserRepository{
    construtor(){}
    
    //method to check if user exist
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

    //method to get all user
    public async GetUsers(){
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    }
    //method to delete user by id
    public async DeleteUser(id: string){
        try {
            return await User.findOneAndDelete({_id: new ObjectId(id)});
        } catch (error) {
            throw error;
        }
    }
}

const userRepository = new UserRepository();
export default userRepository;