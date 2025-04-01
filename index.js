require("dotenv").config();
const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// Send SMS endpoint
app.post("/api/send-sms", async (req, res) => {
  console.log(req.body.call);
  const to = req.body.call.to_number;

  console.log(to);

  if (!to) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const message = await client.messages.create({
      body: "Hey there! To find your Xbox gamertag, simply press the Xbox button on your controller to open the guide, select “Profile & system,” then choose your profile. Your gamertag will be right under your profile name. Thanks!",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    res.json({
      success: true,
      messageId: message.sid,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(200).json({
      success: true,
      error: error.message,
    });
  }
});

app.post("/api/send-sms-settlement", async (req, res) => {
  console.log(req.body.call);
  const to = req.body.call.to_number;

  console.log(to);

  if (!to) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const message = await client.messages.create({
      body: `Krause & Kinsman Law Firm - Zantac Settlement Registration
        Please go to the official portal: https://app.milestonepathway.com/login
        Your ML ID: [Insert MLID]
        Password: Last 4 digits of your SSN

        Instructions:
        👉 Signing guide: https://bit.ly/41KSuy2
        👉 FAQs: https://bit.ly/4iOnrIC

        Please complete your registration as soon as possible to secure your settlement.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    res.json({
      success: true,
      messageId: message.sid,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(200).json({
      success: true,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
