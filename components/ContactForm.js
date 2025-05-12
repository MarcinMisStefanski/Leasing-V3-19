import { useState } from "react";

export default function ContactForm() {
  const [nip, setNip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nip || !phone || !email) {
      setMessage("Wszystkie pola są wymagane.");
      return;
    }

    try {
      const res = await fetch("/api/send-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nip, phone, email }),
      });

      if (res.ok) {
        setMessage("Dziękujemy! Formularz został wysłany.");
        setNip(""); setPhone(""); setEmail("");
      } else {
        setMessage("Coś poszło nie tak. Spróbuj ponownie.");
      }
    } catch (err) {
      setMessage("Błąd sieci. Spróbuj później.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4 mt-10">
      <h2 className="text-2xl font-bold">Otrzymaj ofertę</h2>
      <div>
        <label className="block font-bold mb-1">NIP</label>
        <input type="text" value={nip} onChange={(e) => setNip(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg font-bold text-lg" />
      </div>
      <div>
        <label className="block font-bold mb-1">Telefon</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg font-bold text-lg" />
      </div>
      <div>
        <label className="block font-bold mb-1">E-mail</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg font-bold text-lg" />
      </div>
      <button type="submit" className="w-full bg-black text-white py-3 text-xl rounded-lg">Zatwierdź</button>
      {message && <p className="text-center font-bold mt-4">{message}</p>}
    </form>
  );
}
