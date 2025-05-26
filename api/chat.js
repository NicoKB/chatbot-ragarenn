export default async function handler(req, res) {
  const { message, model } = req.body;

  const response = await fetch(`https://ragarenn.eskemm-numerique.fr/demo@bretagne.bzh/api/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.RAGARENN_API_KEY}`
    },
    body: JSON.stringify({
      model: model || "deepseek-coder:33b",
      messages: [
        {
          role: "system",
          content: "Tu es un assistant public qui aide les usagers à comprendre les services proposés par la Région Bretagne. Réponds de manière claire, concise, et polie."
        },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data?.choices?.[0]?.message?.content || "Aucune réponse" });
}
