// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const cors = require('cors');
// const fs = require('fs');
// const upload = multer({ dest: 'uploads/' });

// const app = express();
// app.use(cors());

// Azure OCR Configuration
// const subscriptionKey = '1893580c81eb4dd39a3a77823eda1868';
// const endpoint = 'https://projectassignment.cognitiveservices.azure.com';

// // Google Translate API Key
// const googleTranslateKey = 'AIzaSyDXjtOASiUIr917oGx2o47CuaRLb0I6v38';

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());

// Set up your API keys and endpoint
const subscriptionKey = '1893580c81eb4dd39a3a77823eda1868';
const azureEndpoint = 'https://projectassignment.cognitiveservices.azure.com';
const googleApiKey = 'AIzaSyDXjtOASiUIr917oGx2o47CuaRLb0I6v38';  // Google Translate API Key

// Function to translate text using Google Translate
const translateText = async (text, targetLanguage) => {
    try {
        const response = await axios.post('https://translation.googleapis.com/language/translate/v2', null, {
            params: {
                q: text,
                target: targetLanguage,
                key: googleApiKey,
            }
        });
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation Error:', error);
        return 'Translation failed.';
    }
};

// OCR and translation logic
app.post('/api/ocr', upload.single('image'), async (req, res) => {
    const image = req.file;
    const imageData = fs.readFileSync(image.path);

    try {
        // Step 1: OCR request to Azure
        const ocrResponse = await axios.post(`${azureEndpoint}/vision/v3.2/read/analyze`, imageData, {
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/octet-stream',
            },
        });

        const operationLocation = ocrResponse.headers['operation-location'];

        // Step 2: Poll for the OCR result
        setTimeout(async () => {
            const ocrResult = await axios.get(operationLocation, {
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                },
            });

            // Extract text from the OCR result
            const readResults = ocrResult.data.analyzeResult.readResults;
            const extractedText = readResults.map(page =>
                page.lines.map(line => line.text).join('\n')
            ).join('\n\n');

            // Step 3: Translate the extracted text
            const translatedText = await translateText(extractedText, 'en'); // Translate to Spanish

            // Step 4: Send the extracted and translated text back to the frontend
            res.status(200).json({
                extractedText,
                translatedText,
            });
        }, 5000); // Delay to allow time for processing OCR

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
