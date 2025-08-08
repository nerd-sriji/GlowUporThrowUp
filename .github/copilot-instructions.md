<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Hairstyle Detection Website - Copilot Instructions

This is a Node.js web application that uses Google's Gemini AI API to detect hairstyles and provide personalized suggestions.

## Project Structure
- `server.js` - Express.js backend server with Gemini AI integration
- `public/` - Frontend assets (HTML, CSS, JavaScript)
- `uploads/` - Temporary storage for uploaded images (auto-created)

## Key Technologies
- **Backend**: Node.js, Express.js, Multer (file uploads)
- **AI**: Google Generative AI (Gemini API)
- **Frontend**: Vanilla JavaScript, HTML5 Camera API, CSS3
- **Environment**: dotenv for configuration

## API Endpoints
- `GET /` - Serve main page
- `POST /api/detect-hairstyle` - Analyze uploaded images
- `GET /api/health` - Health check endpoint

## Key Features
- Camera capture functionality
- File upload support
- Real-time hairstyle analysis using Gemini AI
- Responsive design
- Error handling and user feedback

## Environment Variables Required
- `GEMINI_API_KEY` - Google Gemini AI API key
- `PORT` - Server port (default: 3000)

## Code Style Guidelines
- Use modern JavaScript (ES6+)
- Follow RESTful API conventions
- Implement proper error handling
- Use semantic HTML and accessible design
- Maintain responsive CSS grid/flexbox layouts

## Security Considerations
- Validate file uploads (type, size)
- Clean up temporary files after processing
- Never expose API keys in frontend code
- Use CORS appropriately
