
const controlador = {}
const Usuario = require("../models/Usuario")


controlador.sigin = async (req,res) =>{  
    try{  
        const {email_username,password} = req.body
        if(email_username||password){
            let usuario = await Usuario.findOne(
                { $or:[ {'email':email_username}, {'username':email_username}]})
            if(!usuario) return res.json({status:false,msg:"Datos incorrectos"});

            const validado = await usuario.validarPassword(password); 
            if(!validado) return res.json({status:false,msg:"Datos incorrectos"});
            //let token = jwt.sign(usuario.tokenizar(),process.env.KEY_JWT,{expiresIn: process.env.JWT_EXPIRE});
            res.json({status:true,msg:"Ok",data:usuario.token()});
        }else{
            res.json({status:false,msg:"Datos incompletos",data: req.body})
        }
    }catch(e){
        console.log(e)
        res.send({status:false,msg:"error",error: e.errmsg||e.message})
    } 
}

controlador.exist = async (req,res) =>{  
    try{  
        const {email,username} = req.body
        if(email||username){
            let usuario = await Usuario.findOne({ $or:[ {'email':email}, {'username':username}]})
            res.json({status:true,msg:"ok",data: !!usuario})
        }else{
            res.json({status:false,msg:"Datos incompletos",data: req.body})
        }
        
    }catch(e){
        res.json({status:false,msg:"error",error: e.errmsg||e.message})
    } 
}

controlador.sigup = async (req,res) =>{    
    try{
        const {email,username,password} = req.body
        if(email&&username&&password){
            const usuario = new Usuario({email,username,password})
            usuario.password = await usuario.encriptar(password);
            await usuario.save();
            //let token = jwt.sign(usuario.tokenizar(),process.env.KEY_JWT,{expiresIn:process.env.JWT_EXPIRE});
            res.json({status:true,msg:"Registro correcto",data: usuario.token()})
        }else{
            res.json({status:false,msg:"Datos incompletos",data: req.body})
        }
    }catch(e){
        res.json({status:false,msg:"error",error: e.errmsg||e.message})
    } 
}

controlador.profile = async (req,res) =>{  
    try{
        const user = await Usuario.findById(req.user.id,{password:0});
        res.json({status:!!user,msg:"",data:user})
    }catch(e){
        res.json({status:false,msg:"error",error: e.errmsg||e.message})
    } 
}

module.exports = controlador