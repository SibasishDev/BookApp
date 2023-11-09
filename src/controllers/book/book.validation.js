
const Joi = require("joi");

class BookValidation {

    /**
    * register: Validation for register.
    * @param data 
    * @returns 
    */
    bookSchema(data) {
       const schema = Joi.object({
           title: Joi.string().min(3).max(100).required(),
           author: Joi.string().max(250).min(3).required(),
           summary: Joi.string().max(500).min(3).required(),
       });

       return schema.validate(data);
   }

    /**
    * login: Validation for login.
    * @param data 
    * @returns 
    */
    updateSchema(data) {
       const schema = Joi.object({
           bookId: Joi.string().required(),
           title : Joi.string(),
           author : Joi.string(),
           summary : Joi.string()
       }).or('title', 'author','summary');

       return schema.validate(data);
   }
}

module.exports  = new BookValidation();