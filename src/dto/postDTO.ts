import {IPost} from '../interfaces/posts.interface';

class PostDTO implements IPost{
    title!: string;
    url!: string;
    content!: string;
    image!: string;

    // constructor(title: string, url: string, content: string, image: string){
    //     this.title = title;
    //     this.url = url;
    //     this.content = content;
    //     this.image = image;
    // }
}
export default PostDTO;

