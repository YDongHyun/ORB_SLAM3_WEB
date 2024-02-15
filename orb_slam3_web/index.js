const express = require("express");
const app = express();
const PORT =8080;

const cors = require("cors");
app.use(cors());

const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, "videos/");
         },
        filename: (req, file, done) => {
          done(null, file.originalname);
        },
    }),
 //limits: { fileSize: 5 * 1024 * 1024 },
})
 

app.get("/",(req,res)=>{
    return res.sendFile(__dirname+"/views/index.html"); 
})


app.post('/api/file',upload.single('file'),(req,res)=>{
    return res.json({file:"OK"})
})


app.listen(PORT , ()=> console.log(`this server listening on ${PORT}`));
