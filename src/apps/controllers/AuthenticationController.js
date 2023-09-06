const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {Op} = require('sequelize');
const {encrypt} = require('../../utils/crypt')

class AuthenticationController{
    async authentication(req,res){
        const{email, user_name, password} = req.body;

        let whereClause = {};
        if(email){
            whereClause = {email};
        }else if (user_name){
            whereClause = {user_name};
        }else{
            return res.status(401).json({error: 'É necessário e-mail ou user_name'})
        }

        const user = await User.findOne({
            where: whereClause,
        });
        if(!user){
            return res.status(401).json({error:'Usuário não encontrado'});
        }

        if(!await user.checkPassword(password)){
            return res.status(401).json({error:'Senha errada'});
        }
        
        const {id, user_name: userName} = user;

        const {iv, content} = encrypt(id);

        const newId =`${iv}:${content}`;
        
        const token = jwt.sign({id:newId}, process.env.HASH_BCRYPT, {
            expiresIn:process.env.EXPIRE_IN,
        });


        
        return res.status(200).json({message: 'usuário autenticado', user:{id, user_name: userName}, token:token })
    }
}
module.exports= new AuthenticationController();