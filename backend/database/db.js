
const mongoose=require("mongoose")


const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI

const uri1 ="mongodb+srv://jemish:jemish@weentaracluster.oq55kiy.mongodb.net/?retryWrites=true&w=majority&appName=weentaraCluster "
exports.connectToDB=async()=>{
    try {
        await mongoose.connect(uri , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // await mongoose.connect(uri)
        console.log('Database connection established');
    } catch (error) {
        console.log(error);
        console.log('Database connection failed');
    }
}




