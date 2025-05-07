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
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Kalkulator Leasingu</h1>

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
        <label className="block text-sm font-medium text-gray-700 mb-2">Wkład własny: {initialPercent}%</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Wykup końcowy: {finalPercent}%</label>
        <input
          type="range"
          min={1}
          max={term === 24 ? 60 : term === 35 ? 50 : term === 47 ? 40 : 30}
          value={finalPercent}
          onChange={(e) => setFinalPercent(Number(e.target.value))}
          className="w-full accent-red-600"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Okres leasingu (miesiące)</label>
        <input
          type="range"
          min={24}
          max={59}
          step={1}
          list="months"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          className="w-full accent-red-600"
        />
        <datalist id="months">
          <option value="24" label="24" />
          <option value="35" label="35" />
          <option value="47" label="47" />
          <option value="59" label="59" />
        </datalist>
        <p className="text-center text-gray-700 font-semibold mt-1">{term} miesięcy</p>
      </div>

      <div className="text-center mt-8 bg-gray-50 py-6 rounded-xl">
        <p className="text-lg text-gray-700">Rata netto:</p>
        <p className="text-4xl font-bold text-red-600 mt-2">{rate.toFixed(2)} zł</p>
      </div>
    </div>
  );
}