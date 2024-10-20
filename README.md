# OCR and Translation Web Application
This project integrates Optical Character Recognition (OCR) using Azure Cognitive Services and text translation using the Google Translate API into a full-stack web application. The frontend is built with React, and the backend is built using Node.js and Express. Users can upload an image, extract the text using OCR, and then translate the extracted text into a specified language (e.g., Spanish).
# ScreenShots
<img width="1509" alt="Screenshot 2024-10-18 at 6 26 28 PM" src="https://github.com/user-attachments/assets/b0be7052-d414-43da-b92a-607b41af520b">
<img width="1509" alt="Screenshot 2024-10-18 at 5 30 49 PM" src="https://github.com/user-attachments/assets/eef4db46-0f2a-4d64-a28f-c2ee43bef406">
<img width="1509" alt="Screenshot 2024-10-18 at 5 29 45 PM" src="https://github.com/user-attachments/assets/2fe420f0-f9d9-47f4-ab97-512f30cd7a12">
<img width="573" alt="Screenshot 2024-10-18 at 2 59 11 AM" src="https://github.com/user-attachments/assets/216ee572-cc90-4e8a-8d05-73227d38ead8">


# Features
  - Upload an image to the web app.
  - Extract text from the image using Azure Cognitive Services' OCR API.
  - Translate the extracted text into a specified language using Google Translate API.
  - Display both the original extracted text and the translated text.
# Technologies Used
  - Frontend: React.js
  - Backend: Node.js, Express
  - Cloud Services:
    - Azure Cognitive Services: OCR (Optical Character Recognition)
    - Google Cloud Translate: Text translation
  - File Upload: Multer
  - HTTP Client: Axios
# Prerequisites
To run this project, ensure you have the following installed:

 - Node.js (v14+)
 - npm (v6+)
 - Cloud Accounts:
   - Azure: For the Computer Vision API
   - Google Cloud: For the Translate API
# Setup Instructions
## 1. Azure Setup for OCR
  - Sign in to Azure Portal.
  - Create a Cognitive Services resource for Computer Vision.
  - Retrieve your subscription key and endpoint from the Azure Portal:
  - Go to the created resource's Keys and Endpoint section.
  - Copy the subscriptionKey and endpoint for use in the backend.
## 2. Google Cloud Setup for Translation
  - Go to the Google Cloud Console.
  - Create a new project or select an existing one.
  - Navigate to APIs & Services > Library and enable the Cloud Translation API.
  - Go to APIs & Services > Credentials and create an API key.
  - Copy the generated API key for use in the backend.
## 3. Backend Setup
  - Clone the repository or download the project files.
  -     git clone https://github.com/ankitojha1999/ocr-project.git
  -     cd ocr-backend
Install the required dependencies:
  -     npm install
Create a .env file in the root of the backend folder with your Azure and Google Cloud API credentials:

  -     AZURE_SUBSCRIPTION_KEY=your-azure-subscription-key
        AZURE_ENDPOINT=https://your-azure-endpoint-url
        GOOGLE_TRANSLATE_API_KEY=your-google-translate-api-key
Run the backend server:
  -     node index.js
The backend server will be running on http://localhost:5001.

4. Frontend Setup
Navigate to the frontend folder:
 -     cd ocr-frontend
Install the required dependencies:
 -     npm install
Run the React development server:
 -     npm start
The React app will be running on http://localhost:3000.

# Usage
  -  Upload an image by clicking the "Select Image" button on the web UI.
  -  Click the "Analyze" button to send the image to the backend.
  -  The backend will:
     -  Extract the text from the image using Azure Cognitive Services' OCR API.
     -  Translate the extracted text using the Google Translate API.
  - Both the extracted text and the translated text will be displayed on the frontend.
# API Overview
### /api/ocr
  - Method: POST
  - Description: This endpoint accepts an image file, sends it to Azure's OCR service to extract text, and then translates the extracted text using 
  - Google Translate API.
### Sample Request:
  -     POST /api/ocr
  -     Content-Type: multipart/form-data
  -     Body: image=<image file>
### Sample Response:

        {
         "extractedText": "Text extracted from the image",
         "translatedText": "Translated text in the target language"
        }


# Future Enhancements
Add support for selecting different target languages for translation.
Implement loading indicators while the OCR and translation processes are being completed.
Add error handling for invalid file uploads and translation failures.
