import userModel from "@/resources/user/user.model";
import token from "@/utils/token";

class UserService {
  private user = userModel;


  public async registerUser(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string | Error> {
    try { 
      const user = await this.user.create({name , email, password, role});
      const accessToken = token.createToken(user);
      //@ts-ignore
      return accessToken;
    }catch(err){
      throw new Error('Unable to register user')
    }
  }
  public async loginUser(
    email: string,
    password: string
  ): Promise<string | Error>{
    try {
      const user = await this.user.findOne({email});
      if(!user){
        throw new Error('Unable to find user with that email')
      }
      if(await user.isValidPassword(password)){
        //@ts-ignore
        return token.createToken(user);
      }else{
        throw new Error('Wrong password')
      }
    }catch(err){
      throw new Error('Unable to login')
    }
  }

}

export default UserService;