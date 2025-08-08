<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />

# GlowUpOrThrowUp 🎯

## Basic Details
### Team Name: Expelliarmus

### Team Members
- Team Lead: Oneela Gopi - LBS College Of Engineering, Povval
- Member 2: Srijith K - LBS College Of Engineering, Povval

### Project Description
An AI-powered hairstyle analysis web app that judges your hair choices harder than your mother and suggests "better" styles using Google's Gemini AI. Because apparently, everyone needs an AI to tell them their hair looks terrible and what they should do about it!

### The Problem (that doesn't exist)
Ever looked in the mirror and thought, "I wish an AI could roast my hairstyle and give me unsolicited advice"? Well, we've got you covered! The world desperately needed another way for technology to judge our appearance and tell us how to "improve" ourselves.

### The Solution (that nobody asked for)
We created a sassy AI hair critic that analyzes your photo, identifies your current hairstyle, and suggests three "better" alternatives. It's like having a brutally honest hairstylist friend, except it's a robot that never gets tired of judging you! Take a selfie, get roasted, and receive AI-generated hair wisdom you definitely didn't ask for.

## Technical Details
### Technologies/Components Used
For Software:
- **Languages**: JavaScript (Node.js), HTML5, CSS3
- **Frameworks**: Express.js for backend server
- **Libraries**: 
  - Google Generative AI (Gemini API) for hairstyle analysis
  - Multer for file upload handling
  - dotenv for environment configuration
- **Tools**: 
  - HTML5 Camera API for photo capture
  - Responsive CSS Grid/Flexbox layouts
  - RESTful API design

For Hardware:
- Any device with a camera (laptop, phone, tablet)
- Web browser with camera permissions
- Internet connection for AI processing

### Implementation
For Software:

# Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd USELESS\ 2.0

# Install dependencies
npm install

# Set up environment variables
# Create .env file and add your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "PORT=3000" >> .env

# Get your API key from: https://aistudio.google.com/app/apikey
```

# Run
```bash
# Start the server
npm start

# Or for development with auto-restart
npm run dev

# Open browser and go to http://localhost:3000
```

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![Screenshot1](Add screenshot 1 here with proper name)
*Main interface showing camera capture and upload options*

![Screenshot2](Add screenshot 2 here with proper name)
*AI analysis results displaying detected hairstyle and suggestions*

![Screenshot3](Add screenshot 3 here with proper name)
*Responsive design working on mobile devices*

# Diagrams
![Workflow](Add your workflow/architecture diagram here)
*User captures photo → Express server processes → Gemini AI analyzes → Results displayed*

## Team Contributions
- **Oneela Gopi**: Frontend development, UI/UX design, camera integration, responsive styling
- **Srijith K**: Backend development, Gemini AI integration, API endpoints, error handling

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)