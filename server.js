const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for hairstyle detection
app.post('/api/detect-hairstyle', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath);
    
    // Convert image to base64
    const base64Image = imageData.toString('base64');
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Analyze this image and identify the person's hairstyle. Please provide:
    1. The current hairstyle name
    2. A brief description of the current hairstyle
    3. 3 suggested better hairstyles that would suit this person's face shape and features
    4. Brief explanations for why each suggested hairstyle would work well
    
    Please format your response as JSON with the following structure:
    {
      "currentHairstyle": "name of current hairstyle",
      "description": "description of current hairstyle",
      "suggestions": [
        {
          "name": "suggested hairstyle name",
          "reason": "why this would work well"
        }
      ]
    }`;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: req.file.mimetype
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON from the response
    let analysisResult;
    try {
      // Extract JSON from the response text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if JSON parsing fails
        analysisResult = {
          currentHairstyle: "Could not determine",
          description: text,
          suggestions: [
            { name: "Consult with response", reason: "See full analysis above" }
          ]
        };
      }
    } catch (parseError) {
      analysisResult = {
        currentHairstyle: "Analysis completed",
        description: text,
        suggestions: [
          { name: "See full analysis", reason: "Complete analysis provided above" }
        ]
      };
    }

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      analysis: analysisResult,
      rawResponse: text
    });

  } catch (error) {
    console.error('Error analyzing hairstyle:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Failed to analyze hairstyle',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Hairstyle Detection Server running on http://localhost:${port}`);
  console.log('Make sure to set your GEMINI_API_KEY in the .env file');
});
