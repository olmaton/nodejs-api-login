const {Schema,model} = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") 

const schema = new Schema({
    email: {type:String,required:true,unique : true},
    username: {type:String,required:true,unique : true},
    password: {type:String,required:true},
},{
    timestamps:true
})
schema.methods.tokenizar = function (){        
    return {"user":{"id":this._id,"username":this.username}}
}

schema.methods.token = function (){  
    return jwt.sign(this.tokenizar(),process.env.KEY_JWT,{expiresIn: process.env.JWT_EXPIRE});
}

schema.methods.encriptar = async (text)=>{    
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(text,salt)    
}

schema.methods.validarPassword = function (text){ 
    return bcrypt.compare(text,this.password)
}

module.exports = model("Usuario",schema)