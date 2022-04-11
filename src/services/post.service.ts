import postsRepository from "../repositories/PostsRepo";
import { IPost } from "../interfaces/posts.interface";
import PostDTO from "../dto/postDTO";
import { domainToASCII } from "url";
class PostsService{

    constructor(){};

    // Methods
    
    //Method that return all Posts
    public async GetPosts(){
        try {
            const posts = await postsRepository.GetPosts();
            if (!posts) {
                return {success: false, message: "Posts Not Found"};
            }
            return this.MapperDto(posts, {});
        } catch (error) {
            throw error;
        }
    }

    //Method that return only one Post
    public async GetPost(url:string){
        try {
            const post = await postsRepository.GetPost(url);
            if (!post) {
                return {success: false, message: "Post Not Found"};
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
    public async UpdatePost(url: string, post: IPost){
        try {
            return await postsRepository.UpdatePost(url, post);
        } catch (error) {
            throw error;
        }
    }

    //Method to Delete a post
    public async DeletePost(url: string){
        try {
            return await postsRepository.DeletePost(url);
        } catch (error: any) {
            return {success: false, message: error.message};
        }
    }
    //Method mapper to fill the Dto
    private MapperDto(arr: any[], item: any){
        if (arr.length > 0) {
            let postDto: Array<PostDTO> = [];
            arr.map(post => {
                let dto = new PostDTO();

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