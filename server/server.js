import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
/*
const config = {
  model: "text-davinci-003",
  temperature: 0,
  max_tokens: 3000,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
}
*/
const config = {
  model: "text-davinci-003",
  temperature: "process.env.TEMPERATURE",
  max_tokens: "process.env.MAX_TOKENS",
  top_p: "process.env.TOP_P",
  frequency_penalty: "process.env.FREQUENCY_PENALTY",
  presence_penalty: "process.env.PRESENCE_PENALTY",
    temperature_value: 0.7,
  max_tokens_value: 50,
  top_p_value: 0.9,
  frequency_penalty_value: 1.0,
  presence_penalty_value: 0.2
}

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: config.model,
  prompt: `${prompt}`,

  temperature: config.temperature_value,
  max_tokens: config.max_tokens_value,
  top_p: config.top_p_value,
  frequency_penalty: config.frequency_penalty_value,
  presence_penalty: config.presence_penalty_value
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})


app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
