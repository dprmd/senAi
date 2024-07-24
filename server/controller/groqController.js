import Groq from "groq-sdk";
import { config } from "dotenv";
config();
import fs from "fs";

const getModelDescription = () => {
  try {
    const data = fs.readFileSync("./controller/modelDescription.json", "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.log(err);
  }
};

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
  const modelDescription = getModelDescription();

  const groq = new Groq({ apiKey });
  try {
    const groqModels = await groq.models.list();
    const groqModelsDetails = groqModels.data.map((model) => {
      const theModel = {
        ...model,
        description: "",
      };
      switch (model.id) {
        case "gemma2-9b-it":
          theModel.description = modelDescription.gemma2_9b_it;
          break;
        case "gemma-7b-it":
          theModel.description = modelDescription.gemma_7b_it;
          break;
        case "llama3-70b-8192":
          theModel.description = modelDescription.llama3_70b_8192;
          break;
        case "llama3-8b-8192":
          theModel.description = modelDescription.llama3_8b_8192;
          break;
        case "mixtral-8x7b-32768":
          theModel.description = modelDescription.mixtral_8x7b_32768;
          break;
        case "whisper-large-v3":
          theModel.description = modelDescription.whisper_large_v3;
          break;
        case "llama-3.1-70b-versatile":
          theModel.description = modelDescription.llama_3_1_70b_versatile;
          break;
        case "llama-3.1-8b-instant":
          theModel.description = modelDescription.llama_3_1_8b_instant;
          break;
        default:
          theModel.description = "there is no information about this model";
          break;
      }

      return theModel;
    });
    res.status(200).json({ status: 200, models: groqModelsDetails });
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};
