const User = require('../models/User')

class UserController{

    async list(req, res){
        const allUsers = await User.findAll();
        res.send({users:allUsers});    
    }
    async create(req, res){
        
        const verifyUser = await User.findOne({
            where:{
                email:  req.body.email,
            },
        });
        
        if(verifyUser){
            return res.status(400).json({message: "usuário cadastrado"});
        }
        const user = await User.create(req.body);
        if(!user){
            return   res.status(501) .json({ message:"Erro ao criar usuário"});
        }
        return res.send({user});    
    }
    
}

module.exports = new UserController();