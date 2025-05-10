import { useState, useEffect } from "react";

export default function LeasingCalculator() {
  const [price, setPrice] = useState(229900);
  const [initialPercent, setInitialPercent] = useState(20);
  const [finalPercent, setFinalPercent] = useState(30);
  const [term, setTerm] = useState(35);
  const [rate, setRate] = useState(0);
  const [warning, setWarning] = useState(false);

  const rrsoBase = { 24: 4.7766, 35: 4.4432, 47: 4.2618, 59: 4.1816 };
  const leasingMargin = 2.5;
  const termLimits = {
    24: [18, 60],
    35: [1, 50],
    47: [1, 40],
    59: [1, 30]
  };

  useEffect(() => {
    const [min, max] = termLimits[term] || [1, 60];
    if (finalPercent < min) setFinalPercent(min);
    if (finalPercent > max) setFinalPercent(max);
  }, [term, finalPercent]);

  useEffect(() => {
    if (!rrsoBase[term]) return;
    const net = price / 1.23;
    const initial = (initialPercent / 100) * net;
    const final = (finalPercent / 100) * net;
    const financed = net - initial;
    const rrso = rrsoBase[term] + leasingMargin;
    const monthlyRate = Math.pow(1 + rrso / 100, 1 / 12) - 1;
    const n = term;
    const pmt = ((financed - final / Math.pow(1 + monthlyRate, n)) * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    setRate(pmt);
    setWarning(initial < 30000);
  }, [price, initialPercent, finalPercent, term]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <div>
        <label className="block font-bold mb-1">Cena samochodu brutto (zł)</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full p-3 border-2 border-gray-300 rounded-xl font-bold text-lg" />
      </div>
      <div>
        <label className="block font-bold mb-1">Wkład własny (%)</label>
        <input type="range" min="0" max="45" value={initialPercent} onChange={(e) => setInitialPercent(Number(e.target.value))} className="w-full h-3 rounded-lg appearance-none bg-gray-300" />
        <div className="mt-1 font-bold text-right">{initialPercent}%</div>
      </div>
      <div>
        <label className="block font-bold mb-1">Wykup (%)</label>
        <input type="range" min={termLimits[term][0]} max={termLimits[term][1]} value={finalPercent} onChange={(e) => setFinalPercent(Number(e.target.value))} className="w-full h-3 rounded-lg appearance-none bg-gray-300" />
        <div className="mt-1 font-bold text-right">{finalPercent}%</div>
      </div>
      <div>
        <label className="block font-bold mb-1">Okres leasingu (miesięcy)</label>
        <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full p-3 border-2 border-gray-300 rounded-xl font-bold text-lg">
          <option value={24}>24 miesięcy</option>
          <option value={35}>35 miesięcy</option>
          <option value={47}>47 miesięcy</option>
          <option value={59}>59 miesięcy</option>
        </select>
      </div>
      {warning && (
        <div className="text-red-600 font-bold mt-2">
          Minimalny wkład to 30 000 zł netto
        </div>
      )}
      <div className="text-center bg-gray-100 p-4 rounded-xl text-2xl font-bold">
        Rata miesięczna: {rate.toFixed(2)} zł
      </div>
    </div>
  );
}
