const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const axios = require('axios');
dotenv.config()

const PORT = process.env.PORT || 3500
app.use(express.json());
app.use(cors({ origin: true }));

app.post('/authenticate', async (req, res) => {
    const { username } = req.body;
    try {
        const response = await axios.put('https://api.chatengine.io/users/',
        {
            "username": username,
            "secret": username,
            firts_name: username
        },
        {headers: {"private-key": process.env.PRIVATE_KEY}},
        )

        return res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error.message)
        return res.status(error.response.status).json(error.response.data)

    }
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})