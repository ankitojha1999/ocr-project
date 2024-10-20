const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());

require('dotenv').config();

const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const endpoint = process.env.ENDPOINT;


app.post('/ocr', upload.single('image'), async (req, res) => {
    const image = req.file;
    const imageData = fs.readFileSync(image.path);

    try {
        const response = await axios.post(`${endpoint}/vision/v3.2/read/analyze`, imageData, {
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/octet-stream',
            },
        });
        const operationLocation = response.headers['operation-location'];

        setTimeout(async () => {
            const resultResponse = await axios.get(operationLocation, {
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                },
            });

            const readResults = resultResponse.data.analyzeResult.readResults;
            const extractedText = readResults.map(page =>
                page.lines.map(line => line.text).join('\n')
            ).join('\n\n');
            
            res.status(200).json({ extractedText });
        }, 5000);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5001, () => {
    console.log('OCR Service running on port 5001');
});
