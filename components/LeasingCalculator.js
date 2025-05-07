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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Kalkulator Leasingu</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium">Cena brutto (PLN)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Wkład własny (%)</label>
        <input
          type="range"
          min={0}
          max={45}
          value={initialPercent}
          onChange={(e) => setInitialPercent(Number(e.target.value))}
          className="w-full"
        />
        <p>{initialPercent}%</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Wykup końcowy (%)</label>
        <input
          type="range"
          min={1}
          max={term === 24 ? 60 : term === 35 ? 50 : term === 47 ? 40 : 30}
          value={finalPercent}
          onChange={(e) => setFinalPercent(Number(e.target.value))}
          className="w-full"
        />
        <p>{finalPercent}%</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Okres leasingu (miesiące)</label>
        <select
          className="w-full p-2 border rounded"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
        >
          <option value={24}>24</option>
          <option value={35}>35</option>
          <option value={47}>47</option>
          <option value={59}>59</option>
        </select>
      </div>

      <div className="text-center mt-6">
        <p className="text-lg">Rata netto:</p>
        <p className="text-3xl font-bold text-red-600">
          {rate.toFixed(2)} zł
        </p>
      </div>
    </div>
  );
}