import joi from 'joi';


const create =  joi.object().keys({
  title : joi.string().required(),
  body : joi.string().required(),
});


export default {create};