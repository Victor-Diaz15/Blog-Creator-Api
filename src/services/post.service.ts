import postsRepository from "../repositories/post.repository";
import { IPost } from "../interfaces/post.interface";
import PostDTO from "../dto/post.dto";
class PostsService {

    constructor(){};

    // Methods
    
    //method for check if a url exists
    public async UrlExist(url: string){
        const urlExist = await postsRepository.UrlExist(url);
        if(urlExist){
            return true;
        }
        else{
            return false;
        }
    }
    //Method that return all Posts
    public async GetPosts(){
        try {
            const posts = await postsRepository.GetPosts();
            if (!posts) {
                return false;
            }
            return this.MapperDto(posts, {});
        } catch (error) {
            throw error;
        }
    }

    //Method that return only one Post
    public async GetPost(id: string){
        try {
            const post = await postsRepository.GetPost(id);
            if (!post) {
                return false;
            }
            return this.MapperDto([], post);
        } catch (error) {
            throw error;
        }
    }

    //Method to add new post
    public async AddPost(post: IPost){
        try {
            const newPost = await postsRepository.CreatePost(post);
            return this.MapperDto([], newPost);
        } catch (error) {
            throw error;
        }
    }

    //Method to Update a post
    public async UpdatePost(id: string, post: IPost){
        try {
            const updatePost = await postsRepository.UpdatePost(id, post);
            if (!updatePost) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
    //Method to Delete a post
    public async DeletePost(id: string){
        try {
            const deletedPost = await postsRepository.DeletePost(id);
            if(!deletedPost){
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
    //Method mapper to fill the Dto
    private MapperDto(arr: any[], item: any){
        if (arr.length > 0) {
            let postDto: Array<PostDTO> = [];
            arr.map(post => {
                let dto = new PostDTO();

                dto.id = post.id;
                dto.title = post.title;
                dto.url = post.url;
                dto.content = post.content;
                dto.image = post.image;

                postDto.push(dto);
            });
            return postDto;
        }
        else if(item){
            let postDto: Array<PostDTO> = [];
            let dto = new PostDTO();
            
            dto.id = item.id;
            dto.title = item.title;
            dto.url = item.url;
            dto.content = item.content;
            dto.image = item.image;

            postDto.push(dto);
            return postDto;
        }
    }
}

const postService = new PostsService();
export default postService;