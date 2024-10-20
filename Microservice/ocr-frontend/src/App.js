import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Request to OCR Service
            const ocrResponse = await axios.post('http://localhost:5001/ocr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const extractedText = ocrResponse.data.extractedText;
            setExtractedText(extractedText);

            // Request to Translation Service
            const translationResponse = await axios.post('http://localhost:5002/translate', {
                text: extractedText,
                targetLanguage: 'en',
            });

            setTranslatedText(translationResponse.data.translatedText);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1>OCR and Translation Microservices</h1>
            <div className="file-upload">
                <input type="file" onChange={handleFileChange} className="file-input" />
                <button onClick={handleSubmit} className="analyze-btn">Analyze</button>
            </div>
            <div className="result-container">
                <h3>Extracted Text:</h3>
                <textarea value={extractedText} readOnly rows="10" className="text-area" />
            </div>
            <div className="result-container">
                <h3>Translated Text:</h3>
                <textarea value={translatedText} readOnly rows="10" className="text-area" />
            </div>
        </div>
    );
}

export default App;

// Ankit Final Code
// Final
