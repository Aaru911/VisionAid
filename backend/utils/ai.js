//AI INIT
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.genAI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
var path = require('path');

const fs = require('fs');
var fileType = ['application', 'pdf'];

const ai = async () => {
  const pdfPath = path.join(__dirname, '../public/data.' + fileType[1]);
  let pdf = {
    inlineData: {
      data: Buffer.from(fs.readFileSync(pdfPath)).toString("base64"),
      mimeType: "application/pdf",
    },
  };

  //Real AI Generation
  const result = await model.generateContent([process.env.prompt, pdf]);
  console.log(result.response.text());  
  return result.response.text();

  //Fake Generation
  // await delay(2000);
  // return "y = 1 - (f^[s.l/f + (20/f)^w])/20^n"
}

module.exports = { ai }
