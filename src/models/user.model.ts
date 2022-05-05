import {model, Document, Schema} from 'mongoose';
import {IUser} from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type:String, required: true},
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: false
    }]
});

userSchema.pre('save', async function (next){
    if (this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

userSchema.methods.ComparePassword = async function (password: string){
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);