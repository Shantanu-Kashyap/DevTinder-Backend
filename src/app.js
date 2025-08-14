const express = require('express');
const app = express();
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const cors =require('cors');

app.use(cors({
    origin: "http://13.53.90.173:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter =require('./routes/profile');
const requestRouter =require('./routes/requests');
const userRouter = require('./routes/user');



app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);



// ------------------------ Connect to DB and Start Server ------------------------
connectDB()
    .then(() => {
        console.log("Database connection established...");
    })
    .catch(err => {
        console.error("❌ Database not connected: ", err.message);
    });

app.listen(3000, '0.0.0.0', () => {
    console.log(" Server is running on 0.0.0.0:3000");
});
