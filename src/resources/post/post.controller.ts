import { Router , Request , Response , NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import httpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middlewares/validation.middleware";
import validate from "@/resources/post/post.validation";
import  PostService from "@/resources/post/post.service";
import Post from "./post.interface";

class PostController implements Controller {
  public path = '/posts';
  public router = Router();
  private postService = new PostService();

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes(): void{
    this.router.post(`${this.path}`,validationMiddleware(validate.create),this.create);   
    this.router.get(`${this.path}` , this.get);
  }

  private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
    try {
      //console.log(req);
      
      const {title, body} = req.body;

      const post : Post  = await this.postService.create(title, body);
      res.status(201).json({ post });
    }catch(err){
      next(new httpException(400 , 'Cannot create post'));
    }
    }

    private get = async (req : Request, res : Response, next : NextFunction) : Promise< Response | void> =>{
      try{
        const posts : Post[] = await this.postService.get();
        res.status(200).json({posts});
      }catch(err){
        console.log(err);
        next(new httpException(404 , 'Cannot get all post'));
      }
    }
  }

export default PostController;