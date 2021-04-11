const Joi = require('joi');

const userRoleValidation = (req,res,next) =>{


    const userRoleValidationSchema = Joi.object({
        firstname: Joi.string().max(100).required(),
        lastname: Joi.string().max(100).required(),
        phone:Joi.number().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        // autre pattern pour une majuscule minimum = ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{​​​​​-~]).{​​​​​6,64}​​​​​$
        adress: Joi.object().required(),
        isAdmin: true
    });
    
        const validation =  userRoleValidationSchema.validate(req.body); 

        if (validation.error) {
            res.json({
                success: 0,
                message: validation.error.details[0].message
            })
        } else{
            next()
        }
};
module.exports = userRoleValidation;
