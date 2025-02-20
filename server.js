const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message) {
        return res.status(400).json({ error: "Phone number and message are required." });
    }

    try {
        const response = await axios.post(process.env.CLICKSEND_SMS_API, {
            messages: [{ to: phone, body: message }]
        }, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.CLICKSEND_USERNAME}:${process.env.CLICKSEND_API_KEY}`).toString("base64")}`,
                "Content-Type": "application/json"
            }
        });
        res.json({ success: true, message: "SMS sent successfully!", data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || "Failed to send SMS." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));