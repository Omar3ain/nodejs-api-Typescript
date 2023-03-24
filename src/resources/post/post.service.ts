import postModel from "@/resources/post/post.model";
import Post from "@/resources/post/post.interface";

class PostService {
  public async create(title : string, body : string) : Promise<Post> {
    try{ 
      const post : Post = await postModel.create({title, body});
      return post;
        }catch(error){
          throw new Error("cant create post");
    }
  }

  public async get() : Promise<Post[]> {
    try{ 
      const posts : Post[]= await postModel.find({});
      return posts;
        }catch(error){
          throw new Error("cant get posts");
    }
  }
}

export default PostService;