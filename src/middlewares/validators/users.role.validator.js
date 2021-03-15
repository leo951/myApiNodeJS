const Joi = require('joi');

const userRoleValidation = (req,res,next) =>{


    const userRoleValidationSchema = Joi.object({
        firstname: Joi.string().max(100).required(),
        lastname: Joi.string().max(100).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        // autre pattern pour une majuscule minimum = ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{​​​​​-~]).{​​​​​6,64}​​​​​$
        isAdmin: Joi.boolean()
    });
    
        const validation =  userRoleValidationSchema.validate(req.body); 

        if (validation.isAdmin = true) {
            next()
        } else{
            res.json({
                success: 0,
                message: validation.error.details[0].message
            })
        }
};
module.exports = userRoleValidation;
