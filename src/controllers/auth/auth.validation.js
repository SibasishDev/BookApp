
const Joi = require("joi");

class AuthValidation {

    /**
    * register: Validation for register.
    * @param data 
    * @returns 
    */
    register(data) {
       const schema = Joi.object({
           email: Joi.string().email().min(4).max(100).required(),
           password: Joi.string().min(5).max(100).required(),
           name: Joi.string().max(250).min(3).required(),
           repeatPassword: Joi.ref('password'),
       });

       return schema.validate(data);
   }

    /**
    * login: Validation for login.
    * @param data 
    * @returns 
    */
    login(data) {
       const schema = Joi.object({
           email: Joi.string().email().min(4).max(100).required(),
           password: Joi.string().min(5).max(100).required()
       });

       return schema.validate(data);
   }
}

module.exports  = new AuthValidation();