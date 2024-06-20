import { Groq } from "groq-sdk";

const apiKey = "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";

const groq = new Groq({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export const requestToGroq = async (pesan) => {
  const balasan = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: pesan,
      },
    ],
    model: "llama3-8b-8192",
  });
  return balasan.choices[0].message.content;
};
