import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

//Configure open APi
const configuration = new Configuration({
  // organization: "org-LZdUUTGYVru3sjCYrmMKNK2T",
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

//listening
app.listen("3080", () => console.log(`listening on port 3080`));

//dummy route to test
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

//post route for making requests

app.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 200,
      temperature: 0.5,
    });
    res.json({ message: response.data.choices[0].text });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
