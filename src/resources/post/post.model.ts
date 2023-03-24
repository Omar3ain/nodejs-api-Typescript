import { Schema, model } from "mongoose";
import Post from '@/resources/post/post.interface';

const Postschema = new Schema({
  title :{
    type : String,
    required : true,
  },
  body :{
    type : String,
    required : true,
  }
},{
  timestamps : true
});

const postModel = model<Post>('post', Postschema);
export default postModel;