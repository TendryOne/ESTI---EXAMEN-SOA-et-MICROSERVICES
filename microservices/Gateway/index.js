const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const morgan = require('morgan')
const AUTH_SERVICE_URL = 'http://localhost:3001';
const BENEFICIARY_SERVICE_URL = 'http://localhost:3003';
const EMPLOYEE_SERVICE_URL = 'http://localhost:3002';

app.use(express.json());
app.use(morgan('dev'))
app.post('/api/authenticate', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/employee`, req.body);
        if (response.data === null) {
            res.status(404).send("Aucun employee trouvee")
        } else {
            res.status(response.status).json(response.data);
        }


    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

app.get('/api/beneficiary', async (req, res) => {
    try {
        const query = req.query
        const response = await axios.get(`${EMPLOYEE_SERVICE_URL}/employee`, {
            params: {
                NAS: query.NAS,
                numeroEmploye: query.numeroEmploye
            }
        });
        res.status(200).json(response.data)

    } catch (error) {
        res.sendStatus(500)
    }
})

app.patch('/api/beneficiary', async (req, res) => {
    try {
        const response = await axios.patch(`${BENEFICIARY_SERVICE_URL}/beneficiary`, req.body)
        res.status(200).json(response.data)

    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});