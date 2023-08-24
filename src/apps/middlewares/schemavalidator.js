const {Validator} = require ('jsonschema');

const validator = new Validator();

const schemaValidator = (schema) => (req, res, next) =>{
    const result = validator.validate(req.body, schema);
    if(!result.valid){
        const messageError = [];
        for(const item of result.errors){
            messageError.push(item.message.replace('"', '').replace('"',''));
        }
        return res.status(401).send({
            schemaError:messageError,
        });
    }
    
    return next();
}

module.exports = schemaValidator;

