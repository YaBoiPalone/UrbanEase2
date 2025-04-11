// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({ dest: 'uploads/' });
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.AIzaSyBL8dca_pZQY3D9VWuzdhLz2bSV37CAuzA);

app.post('/classify', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');

    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const prompt = `Classify the civic issue in the image as one of the following categories: "Pothole", "Garbage Cans", or "Spitting on Walls". 
Also determine the severity of the issue as "Mild", "Moderate", or "Severe". 
Return the response in JSON format like: {"category": "Pothole", "severity": "Moderate"}`;

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
    ]);

    const responseText = result.response.text().trim();
    const cleaned = responseText.replace(/```json|```/g, '').trim();
    const json = JSON.parse(cleaned);

    fs.unlinkSync(req.file.path); // clean up

    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to classify image' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
