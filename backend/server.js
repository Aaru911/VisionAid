var express = require('express');
const morgan = require("morgan");
const cors = require("cors");

const multer=require('multer');
const dotenv = require('dotenv');

var app = module.exports = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
dotenv.config();

//utils
const genAI = require('./utils/ai.js');



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



app.get('/', (req, res)=>{
    res.json({title:'VisionAid'});
});

app.post('/upload', upload.single('file') ,async(req,res)=>{
  try {
    console.log('fileName: '+req.file.path+'\nSize: '+req.file.size);
  } catch (error) {
    console.log('error');
  }
  const result = await genAI.ai()
  console.log(result);
  res.json(result);
});

app.listen(process.env.serverPort, () => {
  console.log('Server is running on port '+process.env.serverPort);
});