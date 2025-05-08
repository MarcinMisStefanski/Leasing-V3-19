import { useState, useEffect } from "react";
import Image from "next/image";

export default function LeasingCalculator() {
  const [price, setPrice] = useState(229990);
  const [initialPercent, setInitialPercent] = useState(20);
  const [finalPercent, setFinalPercent] = useState(30);
  const [term, setTerm] = useState(35);
  const [rate, setRate] = useState(0);
  const [warning, setWarning] = useState(false);

  const rrsoBase = { 24: 4.7766, 35: 4.4432, 47: 4.2618, 59: 4.1816 };
  const leasingMargin = 2.5;

  useEffect(() => {
    const limity = { 24: { min: 18, max: 60 }, 35: { min: 1, max: 50 }, 47: { min: 1, max: 40 }, 59: { min: 1, max: 30 } };
    const { min, max } = limity[term];
    if (finalPercent < min) setFinalPercent(min);
    if (finalPercent > max) setFinalPercent(max);
  }, [term]);

  useEffect(() => {
    const priceNet = price / 1.23;
    const initialPayment = (initialPercent / 100) * priceNet;
    const finalPayment = (finalPercent / 100) * priceNet;
    const financed = priceNet - initialPayment;

    const rrso = (rrsoBase[term] || 0) + leasingMargin;
    const monthlyRate = Math.pow(1 + rrso / 100, 1 / 12) - 1;

    const n = term;
    const pmt =
      ((financed - finalPayment / Math.pow(1 + monthlyRate, n)) * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -n));

    setRate(pmt);
    setWarning(initialPayment < 30000);
  }, [price, initialPercent, finalPercent, term]);

  const priceNet = price / 1.23;
  const initialPayment = (initialPercent / 100) * priceNet;
  const finalPayment = (finalPercent / 100) * priceNet;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-2xl shadow-lg text-gray-900 font-sans">
      <div className="flex justify-center mb-4">
        <Image src="/logo.png" alt="EVdlaCiebie" width={160} height={50} />
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-800">
        Kalkulator Leasingu
      </h1>

      <div className="text-center text-xl font-medium mb-4">
        Cena brutto (PLN):
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="text-center text-2xl font-bold w-40 ml-4 border-b-2 border-red-600 focus:outline-none"
        />
      </div>

      <div className="space-y-6 text-center mb-6">
        <div>
          <p className="text-lg font-semibold mb-1">Wkład własny: {initialPercent}% ({initialPayment.toLocaleString(undefined, {maximumFractionDigits: 0})} zł)</p>
          <input type="range" min={0} max={45} value={initialPercent} onChange={(e) => setInitialPercent(Number(e.target.value))} className="w-full accent-red-600" />
        </div>

        <div>
          <p className="text-lg font-semibold mb-1">Wykup końcowy: {finalPercent}% ({finalPayment.toLocaleString(undefined, {maximumFractionDigits: 0})} zł)</p>
          <input type="range" min={term === 24 ? 18 : 1} max={term === 24 ? 60 : term === 35 ? 50 : term === 47 ? 40 : 30} value={finalPercent} onChange={(e) => setFinalPercent(Number(e.target.value))} className="w-full accent-red-600" />
        </div>

        <div>
          <p className="text-lg font-semibold mb-1">Okres leasingu: {term} miesięcy</p>
          <input type="range" min={24} max={59} step={1} value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full accent-red-600" />
        </div>
      </div>

      {warning && (
        <div className="text-red-600 text-center font-semibold text-sm mb-6">
          ⚠️ Wkład własny musi wynosić minimum 30 000 zł netto, aby skorzystać z dotacji „NaszEauto”.
        </div>
      )}

      <div className="text-center bg-gradient-to-br from-blue-900 to-blue-700 text-yellow-400 py-6 rounded-2xl shadow-inner mt-6">
        <p className="text-xl font-semibold line-through text-white/70 mb-1">2 514,27 zł</p>
        <p className="text-5xl font-extrabold">{rate.toFixed(2)} zł</p>
        <p className="text-sm font-medium mt-1 text-white">netto / miesiąc</p>
      </div>
    </div>
  );
}