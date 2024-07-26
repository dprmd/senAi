import { filterModels } from "../lib/myUtils";
import { groqGetReplyEndPoint, groqGetModelsEndPoint } from "./serverSource";

export const getGroqModels = async () => {
  const { fetchJson } = await import("../lib/myUtils");
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
    return modelsList
  } else {
    console.log(models);
  }
};

export const getGroqReply = async (message, role, model) => {
  const { fetchJson } = await import("../lib/myUtils");
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
      role,
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
