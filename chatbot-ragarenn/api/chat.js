export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://ragarenn.eskemm-numerique.fr/equipe2/api/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.RAGARENN_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-coder:33b",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();

  res.status(200).json({ reply: data?.choices?.[0]?.message?.content || "Aucune réponse" });
}
