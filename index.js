import e from "express";
const app = e();

const PORT = process.env.PORT ?? 8080

app.get("/", (req,res)=>{
    res.status(200).json({message:"Server is running fine!"})
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}!`);
})