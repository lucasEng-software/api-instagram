const {decryptedToken} = require('../../utils/token')
const {decrypt} = require('../../utils/crypt')

const verifyJwt = async (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:'Sem token enviado!'})
    }

    try{
        const {id}= await decryptedToken(authHeader);
        req.id= parseInt(decrypt(id));
        return next();
    }   catch(error){
        return res.status(401).json({message:'Não autorizado!'})
    }
};

module.exports = verifyJwt;