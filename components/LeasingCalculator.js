import { useState, useEffect } from "react";

export default function LeasingCalculator() {
  const [price, setPrice] = useState(229990);
  const [initialPercent, setInitialPercent] = useState(20);
  const [finalPercent, setFinalPercent] = useState(30);
  const [term, setTerm] = useState(35);
  const [rate, setRate] = useState(0);

  const rrsoBase = {
    24: 4.7766,
    35: 4.4432,
    47: 4.2618,
    59: 4.1816,
  };

  const leasingMargin = 2.5;

  useEffect(() => {
    const limity = {
      24: { min: 18, max: 60 },
      35: { min: 1, max: 50 },
      47: { min: 1, max: 40 },
      59: { min: 1, max: 30 },
    };
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
  }, [price, initialPercent, finalPercent, term]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Kalkulator Leasingu</h1>
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Cena brutto (PLN)</label>
        <input
          type="number"
          className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Wkład własny: <span className="text-red-600 font-semibold">{initialPercent}%</span>
        </label>
        <input
          type="range"
          min={0}
          max={45}
          value={initialPercent}
          onChange={(e) => setInitialPercent(Number(e.target.value))}
          className="w-full accent-red-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Wykup końcowy: <span className="text-red-600 font-semibold">{finalPercent}%</span>
        </label>
        <input
          type="range"
          min={term === 24 ? 18 : 1}
          max={term === 24 ? 60 : term === 35 ? 50 : term === 47 ? 40 : 30}
          value={finalPercent}
          onChange={(e) => setFinalPercent(Number(e.target.value))}
          className="w-full accent-red-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Okres leasingu (miesiące)</label>
        <select
          className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
        >
          <option value={24}>24 miesiące</option>
          <option value={35}>35 miesięcy</option>
          <option value={47}>47 miesięcy</option>
          <option value={59}>59 miesięcy</option>
        </select>
      </div>

      <div className="text-center mt-8 bg-gray-50 py-6 rounded-xl">
        <p className="text-lg text-gray-700">Rata netto:</p>
        <p className="text-4xl font-bold text-red-600 mt-2">{rate.toFixed(2)} zł</p>
      </div>
    </div>
  );
}