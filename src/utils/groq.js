import { Groq } from "groq-sdk";

const apiKeys = [
  "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", // default : 0
  "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", // 1
  "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", // 2
  "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", // 3
  "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", // 4
];
const getApiKeyIndex = localStorage.getItem("apiKeyIndex");
const apiKeyIndex = getApiKeyIndex ? getApiKeyIndex : 0;
const apiKey = apiKeys[Number(apiKeyIndex)];

const groq = new Groq({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export const requestToGroq = async (pesan, role, model) => {
  const balasan = await groq.chat.completions.create({
    messages: [
      {
        role,
        content: pesan,
      },
    ],
    model,
  });
  return balasan.choices[0].message.content;
};
