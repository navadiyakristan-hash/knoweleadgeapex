const mongoose=require("mongoose")
const {Schema}=mongoose


const brandSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{type:String, 
        required:false
    }
})

module.exports=mongoose.model("Brand",brandSchema)