import Groq from "groq-sdk";
import { config } from "dotenv";
import { modelDescription } from "./modelDescription.js";
config();
import { filterModels } from "../lib/utils.js";
import fs from "fs";

export const getGroqReply = async (req, res) => {
  const apiKeys = process.env.GROQ_API_KEYS.split(",");
  const { apiKeyIndex, message, model, systemInstruction, conversation } =
    req.body;
  const apiKey = apiKeys[Number(apiKeyIndex)];
  const conversationMemory = conversation.map(({ time, ...rest }) => rest);

  const groq = new Groq({ apiKey });

  try {
    const requestToGroq = async (message, model) => {
      const reply = await groq.chat.completions.create({
        messages: [
          ...conversationMemory,
          {
            role: "system",
            content: systemInstruction,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: model,
      });
      return reply.choices[0].message.content;
    };

    const reply = await requestToGroq(message, model);

    res.status(200).json({ status: 200, reply: reply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};

export const getGroqModels = async (req, res) => {
  const apiKeys = process.env.GROQ_API_KEYS.split(",");
  const { apiKeyIndex } = req.query;
  const apiKey = apiKeys[Number(apiKeyIndex)];

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
    const filteredModels = filterModels(groqModelsDetails);
    res.status(200).json({ status: 200, models: filteredModels });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: error });
  }
};

export const getGroqTranscription = async (req, res) => {
  const apiKeys = process.env.GROQ_API_KEYS.split(",");
  const { apiKeyIndex } = JSON.parse(req.body.jsonData);
  const recordingFile = req.file;
  const apiKey = apiKeys[Number(apiKeyIndex)];

  try {
    const groq = new Groq({ apiKey });
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(recordingFile.path),
      model: "whisper-large-v3",
      prompt: "Specify context or spelling",
      response_format: "json",
    });
    let text;
    if (transcription.text.length === 0) {
      text = "No Question :)";
    } else {
      text = transcription.text;
    }
    res.status(200).json({ status: 200, text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error });
  }
};
