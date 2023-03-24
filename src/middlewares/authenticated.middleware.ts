import { Request, Response , NextFunction } from "express";
import token from '@/utils/token'
import userModel from "@/resources/user/user.model";
import Token from '@/utils/interfaces/token.interface';
import httpException from "@/utils/exceptions/http.exception";
import  jwt  from "jsonwebtoken";

async function authenticated (req: Request, res: Response , next: NextFunction) : Promise<Response | void>{
  const bearer = req.headers.authorization;

  if(!bearer || !bearer.startsWith('Bearer ')) {
    return next(new httpException(401 , 'Unauthorized'))
  }
  const accessToken = bearer.split('Bearer ')[1].trim();

  try{
    const payload : Token | jwt.JsonWebTokenError = await token.verifyToken(accessToken);
    if(payload instanceof jwt.JsonWebTokenError){
      return next(new httpException(401 , 'Unauthorized'))
    }
    const user = await userModel.findById(payload.id).select('-password').exec();

    if(!user){
      return next(new httpException(401 , 'Unauthorized'))
    }
    //@ts-ignore
    req.user = user
    return next();
  }catch(err){
    return next(new httpException(401 , 'Unauthorized'))
  }
  

}

export default authenticated;