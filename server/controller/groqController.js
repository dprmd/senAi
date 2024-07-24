import Groq from "groq-sdk";
import { config } from "dotenv";
config();

export const getGroqReply = async (req, res) => {
  const apiKeys = process.env.GROQ_API_KEYS.split(",");
  const { apiKeyIndex, message, role, model } = req.body;
  const apiKey = apiKeys[Number(apiKeyIndex)];

  const groq = new Groq({ apiKey });

  try {
    const requestToGroq = async (message, role, model) => {
      const reply = await groq.chat.completions.create({
        messages: [
          {
            role,
            content: message,
          },
        ],
        model,
      });
      return reply.choices[0].message.content;
    };

    const reply = await requestToGroq(message, role, model);

    res.status(200).json({ status: 200, reply: reply });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export const getGroqModels = async (req, res) => {
  const apiKeys = process.env.GROQ_API_KEYS.split(",");
  const { apiKeyIndex } = req.body;
  const apiKey = apiKeys[Number(apiKeyIndex)];

  const groq = new Groq({ apiKey });
  try {
    const groqModels = await groq.models.list();
    const groqModelsDetails = groqModels.data.map((model) => {
      switch (model.id) {
        case "gemma2-9b-it":
          return {
            ...model,
            description:
              "V2 9B parameter version of Google's Gemma models- a family of lightweight, state-of-the-art language models from Google, with open weights, and pre-trained variants.",
          };
        case "gemma-7b-it":
          return {
            ...model,
            description:
              "V1.1 7B parameter version of Google's Gemma models- a family of lightweight, state-of-the-art language models from Google, with open weights, and pre-trained variants.",
          };
        case "llama3-70b-8192":
          return {
            ...model,
            description:
              "The 70B parameter version of Meta's Llama model delivers state of the art performance.",
          };
        case "llama3-8b-8192":
          return {
            ...model,
            description:
              "The 8B parameter version of Meta's Llama model delivers compelling performance at best in class speed and price.",
          };
        case "mixtral-8x7b-32768":
          return {
            ...model,
            description:
              "A high-quality sparse mixture of experts model (SMOE) with open weights that handles a context of 32K tokens.",
          };
        case "whisper-large-v3":
          return {
            ...model,
            description:
              "pre-trained model for automatic speech recognition (ASR) and speech translation",
          };
        default:
          return {
            ...model,
            description: "there is no information about this model",
          };
      }
    });
    res.status(200).json({ status: 200, models: groqModelsDetails });
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};
