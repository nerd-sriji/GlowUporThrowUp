# 🎨 AI Hairstyle Detector & Advisor

A modern web application that uses Google's Gemini AI to detect your current hairstyle and suggest better ones based on your face shape and features.

## ✨ Features

- **📷 Camera Capture**: Take photos directly from your webcam
- **📁 File Upload**: Upload existing photos for analysis
- **🤖 AI Analysis**: Powered by Google Gemini AI for accurate hairstyle detection
- **💡 Smart Suggestions**: Get personalized hairstyle recommendations
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🎯 Real-time Processing**: Fast analysis with detailed explanations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone or download this project**
   ```bash
   cd "USELESS 2.0"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env` file and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

4. **Get your Gemini API key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Replace `your_actual_api_key_here` in `.env` file

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Allow camera permissions when prompted

## 🎯 How to Use

1. **Choose your input method**:
   - Click "📷 Start Camera" to use your webcam
   - Click "📁 Upload Photo" to select an existing image

2. **Capture or select your photo**:
   - If using camera: Click "📸 Take Photo" when ready
   - If uploading: Select an image file from your device

3. **Analyze your hairstyle**:
   - Click "🔍 Analyze Hairstyle"
   - Wait for AI processing (usually 5-10 seconds)

4. **View results**:
   - See your current hairstyle name and description
   - Review personalized hairstyle suggestions
   - Read detailed explanations for each recommendation

5. **Try another photo**:
   - Click "📷 Analyze Another Photo" to start over

## 🛠️ Technical Details

### Backend (Node.js/Express)
- **Express.js** server with REST API endpoints
- **Multer** for handling file uploads
- **Google Generative AI** SDK for image analysis
- **CORS** enabled for cross-origin requests
- **dotenv** for environment configuration

### Frontend (Vanilla JavaScript)
- **HTML5 Camera API** for webcam access
- **Canvas API** for image capture and processing
- **Fetch API** for server communication
- **Responsive CSS Grid/Flexbox** layouts
- **Modern ES6+** JavaScript features

### AI Integration
- **Gemini 1.5 Pro** model for image analysis
- **Base64 image encoding** for API transmission
- **JSON response parsing** with fallback handling
- **Detailed prompt engineering** for accurate results

## 📁 Project Structure

```
USELESS 2.0/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── public/               # Frontend assets
│   ├── index.html        # Main webpage
│   ├── styles.css        # Styling and responsive design
│   └── script.js         # Frontend JavaScript logic
├── uploads/              # Temporary image storage (auto-created)
└── .github/
    └── copilot-instructions.md  # Copilot configuration
```

## 🔧 API Endpoints

- `GET /` - Serve the main webpage
- `POST /api/detect-hairstyle` - Analyze uploaded images
- `GET /api/health` - Server health check

## 🎨 Customization

### Styling
- Edit `public/styles.css` to customize the appearance
- Modify color schemes, fonts, and layouts
- Responsive breakpoints can be adjusted

### AI Prompts
- Update the prompt in `server.js` to change analysis focus
- Adjust the JSON response structure as needed
- Fine-tune suggestions criteria

### Features
- Add user accounts and history
- Implement image filters or preprocessing
- Include more detailed face shape analysis

## 🔒 Security Notes

- API keys are stored securely in environment variables
- Uploaded images are temporarily stored and cleaned up
- File type validation prevents malicious uploads
- CORS is configured for secure cross-origin requests

## 🐛 Troubleshooting

### Common Issues

1. **Camera not working**:
   - Check browser permissions
   - Ensure HTTPS in production
   - Try different browsers

2. **API errors**:
   - Verify your Gemini API key is correct
   - Check internet connection
   - Ensure API key has proper permissions

3. **Upload failures**:
   - Check file size (should be < 10MB)
   - Verify image format (JPG, PNG, WebP)
   - Ensure sufficient disk space

### Error Messages
- Check browser console for detailed error logs
- Server logs will show API communication issues
- Network tab shows request/response details

## 📱 Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 11+)
- **Edge**: Full support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Credits

- **Google Gemini AI** for powerful image analysis
- **Express.js** for robust web server framework
- **Multer** for seamless file upload handling

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Ensure all prerequisites are properly installed
4. Verify your Gemini API key is valid and active

---

Made with ❤️ for better hairstyles everywhere!
