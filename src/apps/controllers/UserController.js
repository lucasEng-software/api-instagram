const User = require('../models/User')
const bcryptjs = require('bcryptjs')
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
        const user = await User.create(req.body); // const user= await UserBUS.createUser(User); ----> DAO responsável por criar o usuário no banco
        if(!user){
            return   res.status(501) .json({ message:"Erro ao criar usuário"});
        }
        return res.send({user});    
    }

    async update (req, res){
        const {
            name,
            avatar,
            bio, 
            gender, 
            old_password, 
            new_password, 
            confirm_new_password,
        } = req.body;

        const user = await User.findOne({
            where : {
                id: req.id,
            },
        });

        if(!user){
            return res.status(400).json({message:'User não encontrado'});
        }

        let encryptedPassword = '';

        if(old_password){
            
            if(!await user.checkPassword(old_password)){
                return res.status(401).json({error:'Senha informada errada!'})
            }

            if(!new_password || !confirm_new_password){
                return res.status(401).json({
                    error: 'É necessário informar os atributos new_password e confirm_new_password'
                })
            }

            if(new_password != confirm_new_password){
                return res.status(401).json({
                    error:'new_password e confirm_new_password devem ser iguais'
                })
            }

            encryptedPassword = await  bcryptjs.hash(new_password, 8);
        }
        await User.update({
            name:name || user.name,
            avatar:avatar || user.avatar,
            bio: bio || user.bio,
            gender: gender || user.gender,
            password_hash: encryptedPassword || user.password_hash
        },
        {
            where:{
                id: user.id,
            }
        });
        return res.status(200).json({Message: "Usuário atualizado com sucesso!"})
    }

    async delete (req, res) {
        const {id} = req.params;
        console.log(id)
        const userToDelete = await User.findOne({
            where:{
                id: id,
            },
        });

        if(!userToDelete){
            return res.status(400).json({message:'Usuário não existe'})
        }

        await User.destroy({
            where:{
                id:id,
            },
        });

        return res.status(200).json({message:'Usuário deletado'});

    }
  
    
}

module.exports = new UserController();