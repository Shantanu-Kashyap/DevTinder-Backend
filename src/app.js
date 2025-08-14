const express = require('express');
const app = express();
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const cors =require('cors');

const allowedOrigins = [
  "http://localhost:5173",   // local frontend
  "http://13.53.90.173:5173" // AWS deployed frontend
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman or server-to-server)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
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
