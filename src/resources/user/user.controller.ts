import  {Router , Request , Response , NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import httpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middlewares/authenticated.middleware';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes(){
    this.router.post(`${this.path}/register`,
    validationMiddleware(validate.register),
    this.register
    );
    this.router.post(`${this.path}/login`,
    validationMiddleware(validate.login),
    this.login
    );
    this.router.get(`${this.path}`, authenticated ,this.getUser)
  }

  private register = async (
    req : Request,
    res : Response,
    next : NextFunction
  ) : Promise<Response | void> => {
    try{
    const {body : {name, email, password}} = req;
    const token = await this.userService.registerUser(
      name, email, password,'user'
    )

    res.status(201).json({token});
  }catch(err : any) {
    next(new httpException(400 , err.message))
  }
  }

  private login = async (
    req : Request,
    res : Response,
    next : NextFunction
  ) : Promise<Response | void> => {
    try{
    const {body : { email, password}} = req;
    const token = await this.userService.loginUser(
      email,password
    )

    res.status(200).json({token});
  }catch(err : any) {
    next(new httpException(400 , err.message))
  }
  }

  private getUser = (
    req : Request,
    res : Response,
    next : NextFunction
  ) : Response | void => {
    //@ts-ignore
    if(!req.user){
      return next(new httpException(404, "User not found"))
    }
    //@ts-ignore
    res.status(200).json({user : req.user})
  }
}

export default UserController;