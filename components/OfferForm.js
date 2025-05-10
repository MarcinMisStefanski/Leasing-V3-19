import { useState } from "react";

export default function OfferForm() {
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!nip || !email || !phone) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    try {
      await fetch("/api/send-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nip, email, phone }),
      });
      setSubmitted(true);
      setError("");
    } catch (err) {
      setError("Błąd podczas wysyłania wiadomości.");
    }
  };

  if (submitted) {
    return <p className="text-green-600 text-center font-semibold mt-4">✅ Oferta została wysłana!</p>;
  }

  return (
    <div className="bg-white mt-10 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Otrzymaj ofertę</h2>

      <div className="mb-4">
        <input type="text" placeholder="NIP" value={nip} onChange={(e) => setNip(e.target.value)} className="w-full p-3 border rounded-md" />
      </div>
      <div className="mb-4">
        <input type="tel" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border rounded-md" />
      </div>
      <div className="mb-4">
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-md" />
      </div>

      {error && <p className="text-red-600 text-center font-semibold mb-2">{error}</p>}

      <button onClick={handleSubmit} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md">Zatwierdź</button>
    </div>
  );
}