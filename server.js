import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

const ARCH_INSTRUCTIONS = `
Você é ARCH AI, um assistente inteligente criado para usuários de Moçambique.
Responda em português claro, natural e, quando fizer sentido, com contexto moçambicano.
Se a pergunta depender de informação atual que você não conhece com segurança, diga que é necessário pesquisar/verificar em fontes atuais.
Não invente fatos. Quando houver incerteza, seja transparente.
Se o usuário pedir explicação, adapte a linguagem ao nível dele.
Se perguntarem sobre Moçambique, priorize contexto, datas, lugares e instituições moçambicanas quando relevantes.
Você não é o ChatGPT e não deve afirmar que é.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    if (!messages.length) return res.status(400).json({ error: "Envie uma mensagem." });

    const clean = messages.slice(-12).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, 12000)
    }));

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      instructions: ARCH_INSTRUCTIONS,
      input: clean
    });

    res.json({ text: response.output_text || "Não consegui gerar uma resposta." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao falar com a IA. Verifique a API key e tente novamente." });
  }
});

app.listen(port, () => {
  console.log(`ARCH AI: http://localhost:${port}`);
});
