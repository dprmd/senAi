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
    return models.models;
  }
};

export const getGroqReply = async (
  message,
  model,
  systemInstruction,
  conversation,
) => {
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
      model,
      systemInstruction,
      conversation,
    }),
  });

  if (replyUserMessage.status === 200) {
    return replyUserMessage.reply;
  }
  if (replyUserMessage.status === 500) {
    return replyUserMessage.error.error.error.message;
  }
};

export const getGroqTranscription = async (formData) => {
  const req = await fetch(groqGetTranscriptionEndPoint, {
    method: "POST",
    body: formData,
  });

  const transcription = await req.json();
  if (transcription.status === 200) {
    return transcription.text;
  }
  if (transcription.status === 500) {
    return transcription.error;
  }
};
