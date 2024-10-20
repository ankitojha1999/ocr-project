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
            const response = await axios.post('http://localhost:5001/api/ocr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setExtractedText(response.data.extractedText);
            setTranslatedText(response.data.translatedText);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>OCR and Translation Analyzer</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Analyze</button>
            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <h3>Extracted Text:</h3>
                    <div style={{ border: '1px solid black', padding: '10px', whiteSpace: 'pre-wrap' }}>
                        {extractedText}
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <h3>Translated Text:</h3>
                    <div style={{ border: '1px solid black', padding: '10px', whiteSpace: 'pre-wrap' }}>
                        {translatedText}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
