class HairstyleDetector {
    constructor() {
        this.stream = null;
        this.capturedImageData = null;
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.camera = document.getElementById('camera');
        this.canvas = document.getElementById('canvas');
        this.photoPreview = document.getElementById('photo-preview');
        this.capturedImage = document.getElementById('captured-image');
        this.fileInput = document.getElementById('file-input');
        
        // Buttons
        this.startCameraBtn = document.getElementById('start-camera');
        this.capturePhotoBtn = document.getElementById('capture-photo');
        this.retakePhotoBtn = document.getElementById('retake-photo');
        this.analyzePhotoBtn = document.getElementById('analyze-photo');
        this.uploadPhotoBtn = document.getElementById('upload-photo');
        this.showRawBtn = document.getElementById('show-raw');
        this.analyzeAnotherBtn = document.getElementById('analyze-another');
        
        // Result elements
        this.loadingDiv = document.getElementById('loading');
        this.resultsDiv = document.getElementById('results');
        this.currentName = document.getElementById('current-name');
        this.currentDescription = document.getElementById('current-description');
        this.suggestionsContainer = document.getElementById('suggestions-container');
        this.rawAnalysis = document.querySelector('.raw-analysis');
        this.rawResponse = document.getElementById('raw-response');
    }

    setupEventListeners() {
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.capturePhotoBtn.addEventListener('click', () => this.capturePhoto());
        this.retakePhotoBtn.addEventListener('click', () => this.retakePhoto());
        this.analyzePhotoBtn.addEventListener('click', () => this.analyzePhoto());
        this.uploadPhotoBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.showRawBtn.addEventListener('click', () => this.toggleRawAnalysis());
        this.analyzeAnotherBtn.addEventListener('click', () => this.resetForNewAnalysis());
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                } 
            });
            this.camera.srcObject = this.stream;
            this.camera.style.display = 'block';
            this.photoPreview.style.display = 'none';
            
            this.startCameraBtn.style.display = 'none';
            this.capturePhotoBtn.style.display = 'inline-block';
            this.analyzePhotoBtn.style.display = 'none';
            this.retakePhotoBtn.style.display = 'none';
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.showError('Unable to access camera. Please check permissions or use the upload option.');
        }
    }

    capturePhoto() {
        const context = this.canvas.getContext('2d');
        this.canvas.width = this.camera.videoWidth;
        this.canvas.height = this.camera.videoHeight;
        
        context.drawImage(this.camera, 0, 0);
        
        this.canvas.toBlob((blob) => {
            this.capturedImageData = blob;
            const imageUrl = URL.createObjectURL(blob);
            this.capturedImage.src = imageUrl;
            
            this.camera.style.display = 'none';
            this.photoPreview.style.display = 'block';
            this.capturePhotoBtn.style.display = 'none';
            this.retakePhotoBtn.style.display = 'inline-block';
            this.analyzePhotoBtn.style.display = 'inline-block';
            
            // Stop camera stream
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
        }, 'image/jpeg', 0.8);
    }

    retakePhoto() {
        this.photoPreview.style.display = 'none';
        this.retakePhotoBtn.style.display = 'none';
        this.analyzePhotoBtn.style.display = 'none';
        this.startCameraBtn.style.display = 'inline-block';
        this.capturedImageData = null;
        
        if (this.capturedImage.src) {
            URL.revokeObjectURL(this.capturedImage.src);
        }
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.capturedImageData = file;
            const imageUrl = URL.createObjectURL(file);
            this.capturedImage.src = imageUrl;
            
            this.camera.style.display = 'none';
            this.photoPreview.style.display = 'block';
            this.startCameraBtn.style.display = 'none';
            this.capturePhotoBtn.style.display = 'none';
            this.retakePhotoBtn.style.display = 'inline-block';
            this.analyzePhotoBtn.style.display = 'inline-block';
        } else {
            this.showError('Please select a valid image file.');
        }
    }

    async analyzePhoto() {
        if (!this.capturedImageData) {
            this.showError('No image to analyze. Please capture or upload a photo first.');
            return;
        }

        this.showLoading();
        
        try {
            const formData = new FormData();
            formData.append('image', this.capturedImageData);

            const response = await fetch('/api/detect-hairstyle', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                this.displayResults(data.analysis, data.rawResponse);
            } else {
                // Handle different error types
                if (response.status === 429) {
                    const retryAfter = data.retryAfter || 5;
                    this.showError(`Rate limit exceeded. Please wait ${retryAfter} seconds and try again.`);
                } else if (response.status === 403) {
                    this.showError('API access denied. Please check your API key configuration.');
                } else {
                    throw new Error(data.error || 'Analysis failed');
                }
            }
        } catch (error) {
            console.error('Error analyzing photo:', error);
            this.showError('Failed to analyze the hairstyle. Please try again in a few moments.');
        } finally {
            this.hideLoading();
        }
    }

    displayResults(analysis, rawResponse) {
        // Display current hairstyle
        this.currentName.textContent = analysis.currentHairstyle || 'Unknown';
        this.currentDescription.textContent = analysis.description || 'No description available';

        // Display suggestions
        this.suggestionsContainer.innerHTML = '';
        if (analysis.suggestions && analysis.suggestions.length > 0) {
            analysis.suggestions.forEach(suggestion => {
                const suggestionCard = document.createElement('div');
                suggestionCard.className = 'suggestion-card';
                suggestionCard.innerHTML = `
                    <h4>${suggestion.name || 'Suggested Style'}</h4>
                    <p>${suggestion.reason || 'No details available'}</p>
                `;
                this.suggestionsContainer.appendChild(suggestionCard);
            });
        } else {
            this.suggestionsContainer.innerHTML = '<p>No specific suggestions available. See complete analysis below.</p>';
        }

        // Store raw response
        this.rawResponse.textContent = rawResponse || 'No detailed analysis available';

        // Show results
        this.resultsDiv.style.display = 'block';
        this.resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    toggleRawAnalysis() {
        const isVisible = this.rawAnalysis.style.display !== 'none';
        this.rawAnalysis.style.display = isVisible ? 'none' : 'block';
        this.showRawBtn.textContent = isVisible ? 'Show Complete Analysis' : 'Hide Complete Analysis';
    }

    resetForNewAnalysis() {
        // Reset UI
        this.resultsDiv.style.display = 'none';
        this.rawAnalysis.style.display = 'none';
        this.showRawBtn.textContent = 'Show Complete Analysis';
        
        // Reset photo
        this.retakePhoto();
        
        // Clear file input
        this.fileInput.value = '';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showLoading() {
        this.loadingDiv.style.display = 'block';
        this.analyzePhotoBtn.disabled = true;
        this.analyzePhotoBtn.textContent = 'Analyzing...';
    }

    hideLoading() {
        this.loadingDiv.style.display = 'none';
        this.analyzePhotoBtn.disabled = false;
        this.analyzePhotoBtn.textContent = '🔍 Analyze Hairstyle';
    }

    showError(message) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const main = document.querySelector('main');
        main.insertBefore(errorDiv, main.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    showSuccess(message) {
        // Remove existing success messages
        const existingMessages = document.querySelectorAll('.success-message');
        existingMessages.forEach(msg => msg.remove());

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const main = document.querySelector('main');
        main.insertBefore(successDiv, main.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HairstyleDetector();
    
    // Health check
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            console.log('Server status:', data);
        })
        .catch(error => {
            console.error('Server connection error:', error);
        });
});
