const express=require('express');
const app=express();
app.use((req,res)=>{
    res.send("Hello there!")
})
app.listen(3000,()=>{
    console.log("Server Listening on port 30000");
    
});