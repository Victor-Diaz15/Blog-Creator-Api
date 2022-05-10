import userRepository from '../repositories/user.repository';
import {IUser, IUserAuth} from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/user.dto';
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
        try {
            const newUser = await userRepository.SignUp(user);
            const userMapper = this._MapperDto(newUser);
            return userMapper;
            
        } catch (error) {
            throw error;
        }
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
    
    //method to get all users
    public async GetUsers(){
        try {
            const users = await userRepository.GetUsers();
            if (!users) {
                return false;
            }
            const mapperUsers = this.MapperDto(users);
            return mapperUsers;
        } catch (error) {
            throw error;
        }
    }
    //method to delete user by id
    public async DeleteUser(id: string){
        try {
            const res = await userRepository.DeleteUser(id);
            if (!res) {
                return false;
            }
            return true;
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
    //method to mapper the UserDTO with arrays of users
    private MapperDto(array: any[]){
        if (array.length > 0) {
            let userDto: Array<UserDTO> = [];
            array.map(user => {
                let dto = new UserDTO();

                dto.id = user.id;
                dto.full_name = user.first_name + " " + user.last_name;
                dto.email = user.email;
                dto.password = user.password;
                dto.posts = user.posts;

                userDto.push(dto);
            });
            return userDto;
        }
    }
    //method to mapper the UserDTO with an obeject
    private _MapperDto(user: any){

        let userDto: Array<UserDTO> = [];
        let dto = new UserDTO();
            
        dto.id = user.id;
        dto.full_name = user.first_name + " " + user.last_name;
        dto.email = user.email;
        dto.password = user.password;
        dto.posts = user.posts;

        userDto.push(dto);
        return userDto;

    }
}

const userService = new UserService();
export default userService;