# ARCH AI — primeira versão

Esta é a primeira versão web do projeto ARCH AI.

## O que já faz
- Interface de chat adaptada ao telemóvel
- Conversa com um modelo de IA através da OpenAI Responses API
- Mantém as últimas mensagens da conversa durante a sessão
- Personalidade/contexto inicial focado em Moçambique
- API key fica no servidor, não no navegador

## O que ainda vamos adicionar
1. Pesquisa na internet
2. Voz: falar com o ARCH AI e ouvir respostas
3. Memória persistente
4. Login de utilizadores
5. Base de conhecimento própria
6. PWA para instalar no Android
7. Publicação online

## Rodar no computador
Instale Node.js. Depois:

npm install

Copie `.env.example` para `.env` e coloque sua chave:

OPENAI_API_KEY=sua_chave

Depois:

npm start

Abra http://localhost:3000

IMPORTANTE: nunca coloque a API key dentro de `public/index.html` ou envie a chave para outras pessoas.
