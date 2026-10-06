const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const MODEL = process.env.OPENAI_MODEL || "gpt-6-luna";

const ARCH_INSTRUCTIONS = `
Você é o ARCH AI, um assistente de inteligência artificial criado para ajudar pessoas,
especialmente usuários de Moçambique.

Responda de forma clara, natural, inteligente e útil.

Você pode conversar sobre conhecimentos gerais, tecnologia, estudos, música,
negócios, programação, história, cultura, entretenimento e muitos outros assuntos.

Quando a pergunta depender de informação atual ou que possa ter mudado,
seja transparente sobre isso.

Não invente informações. Se não souber algo com segurança, diga que não tem
certeza em vez de criar uma resposta falsa.

Use português por padrão, mas acompanhe o idioma usado pelo usuário.

Seu objetivo é ser um assistente útil, rápido e fácil de conversar.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Formato de mensagens inválido."
      });
    }

    const recentMessages = messages.slice(-12);

    const response = await client.responses.create({
      model: MODEL,
      instructions: ARCH_INSTRUCTIONS,
      input: recentMessages
    });

    res.json({
      reply: response.output_text || "Não consegui gerar uma resposta."
    });

  } catch (error) {
    console.error("Erro no ARCH AI:", error);

    res.status(500).json({
      error: "O ARCH AI encontrou um erro ao processar a mensagem."
    });
  }
});

app.get("/api/status", (req, res) => {
  res.json({
    online: true,
    assistant: "ARCH AI"
  });
});

module.exports = app;
