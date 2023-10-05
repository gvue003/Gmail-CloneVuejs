const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "79826411827-ppcmadjltd10ckvb7j99pgetubhf2q1s.apps.googleusercontent.com"
);

app.use(bodyParser.json());
app.use(cors());

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.post("/api/google-login", async (req, res) => {
  try {
    const data = await client.verifyIdToken({
      idToken: req.body.token,
    });
    res.status(200).json(data.getPayload());
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

app.listen(4001, () => {
  console.log("Server is up at http://localhost:4001");
});
