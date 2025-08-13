const mongoose=require('mongoose');
const connectDB = async () => {
mongoose.connect("mongodb+srv://Shantanu167:Sko9431401185%40@sko.buogje3.mongodb.net/devTinder");
}

module.exports = connectDB;

