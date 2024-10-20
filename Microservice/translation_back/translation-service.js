const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON body

require('dotenv').config();

const googleApiKey = process.env.googleApiKey;


app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        const response = await axios.post('https://translation.googleapis.com/language/translate/v2', null, {
            params: {
                q: text,
                target: targetLanguage,
                key: googleApiKey,
            },
        });

        res.status(200).json({ translatedText: response.data.data.translations[0].translatedText });
    } catch (error) {
        console.error('Translation Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5002, () => {
    console.log('Translation Service running on port 5002');
});
