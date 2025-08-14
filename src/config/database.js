const mongoose=require('mongoose');
const connectDB = async () => {
mongoose.connect("mongodb+srv://Shantanu167:cHG5rFxU4hNym73D@sko.buogje3.mongodb.net/devTinder");
}

module.exports = connectDB;

