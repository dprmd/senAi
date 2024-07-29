import { filterModels } from "../lib/myUtils";
import { fetchJson } from "../lib/myUtils";
import {
  groqGetReplyEndPoint,
  groqGetModelsEndPoint,
  groqGetTranscriptionEndPoint,
} from "./serverSource";

export const getGroqModels = async () => {
  const getApiKeyIndex = localStorage.getItem("senAi-user");
  const apiKeyIndex = getApiKeyIndex ? getApiKeyIndex : 0;

  const models = await fetchJson(groqGetModelsEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKeyIndex,
    }),
  });

  if (models.status === 200) {
    const modelsList = filterModels(models.models);
    return modelsList;
  } else {
    console.log(models);
  }
};

export const getGroqReply = async (message, systemInstruction, model) => {
  const getApiKeyIndex = localStorage.getItem("senAi-user");
  const apiKeyIndex = getApiKeyIndex ? getApiKeyIndex : 0;

  const replyUserMessage = await fetchJson(groqGetReplyEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKeyIndex,
      message,
      systemInstruction,
      model,
    }),
  });

  if (replyUserMessage.status === 200) {
    return replyUserMessage.reply;
  }
  if (replyUserMessage.status === 500) {
    console.log(replyUserMessage);
    return replyUserMessage.error.error.error.message;
  }
};

export const getGroqTranscription = async (formData) => {
  const req = await fetch(groqGetTranscriptionEndPoint, {
    method: "POST",
    body: formData,
  });

  const transcriptionText = await req.json();
  console.log(transcriptionText);
  if (transcriptionText.status === 200) {
    return transcriptionText.text;
  }
  if (transcriptionText.status === 500) {
    console.log(transcriptionText);
    return transcriptionText.error;
  }
};
