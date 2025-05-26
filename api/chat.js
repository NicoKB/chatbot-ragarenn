export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch("https://ragarenn.eskemm-numerique.fr/demo@bretagne.bzh/api/chat/completions", {
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
    console.log("Réponse RAGaRenn :", JSON.stringify(data, null, 2));

    res.status(200).json({ reply: data?.choices?.[0]?.message?.content || "Aucune réponse" });
  } catch (err) {
    console.error("Erreur RAGaRenn :", err);
    res.status(500).json({ reply: "Erreur côté serveur" });
  }
}
