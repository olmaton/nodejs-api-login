const mongoose = require("mongoose") 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
/*useFindAndModify:false*/ })
const connection = mongoose.connection

connection.once("open",()=>{
    console.log("MongDB Open")
})