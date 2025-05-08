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
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg px-10 py-12 border text-gray-900">
      <div className="flex items-center justify-between mb-8">
        <Image src="/logo.png" alt="EVdlaCiebie" width={160} height={40} />
        <h1 className="text-3xl font-extrabold text-red-600">Kalkulator Leasingu</h1>
      </div>

      <div className="text-center text-xl font-semibold mb-10">
        Cena brutto: <span className="text-2xl text-red-600 font-bold">{price.toLocaleString()} zł</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-semibold mb-2">Wkład własny: {initialPercent}% ({initialPayment.toLocaleString(undefined, {maximumFractionDigits: 0})} zł)</label>
          <input type="range" min={0} max={45} value={initialPercent} onChange={(e) => setInitialPercent(Number(e.target.value))} className="w-full accent-red-600" />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Wykup końcowy: {finalPercent}% ({finalPayment.toLocaleString(undefined, {maximumFractionDigits: 0})} zł)</label>
          <input type="range" min={term === 24 ? 18 : 1} max={term === 24 ? 60 : term === 35 ? 50 : term === 47 ? 40 : 30} value={finalPercent} onChange={(e) => setFinalPercent(Number(e.target.value))} className="w-full accent-red-600" />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Okres leasingu: {term} miesięcy</label>
          <input type="range" min={24} max={59} step={1} value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full accent-red-600" />
        </div>

        <div className="text-center bg-gray-100 p-6 rounded-xl flex flex-col justify-center">
          <p className="text-lg text-gray-800 mb-1">Rata netto:</p>
          <p className="text-5xl font-extrabold text-red-600">{rate.toFixed(2)} zł</p>
        </div>
      </div>

      {warning && (
        <div className="text-red-600 text-center font-semibold text-md mt-6">
          ⚠️ Wkład własny musi wynosić minimum 30 000 zł netto, aby skorzystać z dotacji „NaszEauto”.
        </div>
      )}
    </div>
  );
}