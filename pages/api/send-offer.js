export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nip, email, phone } = req.body;
  if (!nip || !email || !phone) {
    return res.status(400).json({ message: "Brakuje danych w formularzu." });
  }

  console.log("Nowa oferta:", { nip, email, phone });
  return res.status(200).json({ message: "Dane zostały przyjęte." });
}