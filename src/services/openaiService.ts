import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getAIRecommendations = async (finances: any[]) => {
  const input = finances.map(f => `Type: ${f.type}, Amount: ${f.amount}, Category: ${f.category}`).join('\n');
  const prompt = `
    Analise os seguintes registros financeiros e sugira maneiras de economizar dinheiro e alcançar metas financeiras:
    ${input}
  `;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0]?.message?.content?.trim();
};
