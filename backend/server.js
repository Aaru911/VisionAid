var express = require('express');
const cors = require("cors");
const multer=require('multer');
const dotenv = require('dotenv');
const fs = require('fs');
const morgan = require("morgan");

//import { createWorker } from 'tesseract.js';
var app = module.exports = express();
app.use(morgan('dev'));
dotenv.config();

//AI INIT
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.genAI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
var fileType=['image','jpeg'];
const image = {
  inlineData: {
    data: Buffer.from(fs.readFileSync(__dirname + "/public/data."+fileType[1])).toString("base64"),
    mimeType: "image/jpeg",
  },
};
// try {
//   const image = {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(__dirname + "/public/data."+fileType[1])).toString("base64"),
//       mimeType: "image/jpeg",
//     },
//   };
  
// } catch (error) {
//   console.log("Please add file")
// }


// const corsOptions = {
//   origin: '*', // Change this to your frontend's URL in production
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

//Multer Setup
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    return cb(null,'./public')
  },
  filename:(req,file,cb)=>{
    fileType = file.mimetype.split('/');
    return cb(null,'data.'+fileType[1]); 
  }
})

const upload=multer({storage});

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({title:'AI PDF Analyzer'});
});

// app.get('scan',(req,res)=>{

// })  

app.post('/upload', upload.single('file') ,async(req,res)=>{
  try {
    console.log('fileName: '+req.file.path+'\nSize: '+req.file.size);
  } catch (error) {
    console.log('error');
  }
  const result = await model.generateContent([process.env.prompt, image]);
  console.log(result.response.text());  

});
  


app.listen(process.env.serverPort, () => {
  console.log('Server is running on port '+process.env.serverPort);
});