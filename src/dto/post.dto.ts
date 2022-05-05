import {IPost} from '../interfaces/post.interface';

class PostDTO implements IPost{
    id!: string;
    title!: string;
    url!: string;
    content!: string;
    image!: string;
}
export default PostDTO;

