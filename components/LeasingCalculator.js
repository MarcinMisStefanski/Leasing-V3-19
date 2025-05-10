import { useState, useEffect } from "react";

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
    const limits = { 24: [18, 60], 35: [1, 50], 47: [1, 40], 59: [1, 30] };
    const [min, max] = limits[term] || [1, 60];
    if (finalPercent < min) setFinalPercent(min);
    if (finalPercent > max) setFinalPercent(max);
  }, [term]);

  useEffect(() => {
    if (!rrsoBase[term]) return;

    const net = price / 1.23;
    const initial = (initialPercent / 100) * net;
    const final = (finalPercent / 100) * net;
    const financed = net - initial;
    const rrso = rrsoBase[term] + leasingMargin;
    const monthlyRate = Math.pow(1 + rrso / 100, 1 / 12) - 1;
    const n = term;
    const pmt = ((financed - final / Math.pow(1 + monthlyRate, n)) * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -n));
    setRate(pmt);
    setWarning(initial < 30000);
  }, [price, initialPercent, finalPercent, term]);

  const priceNet = price / 1.23;
  const initialPayment = (initialPercent / 100) * priceNet;
  const finalPayment = (finalPercent / 100) * priceNet;
  const rateBrutto = rate * 1.23;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 font-sans">
      <div className="flex justify-between items-center mb-8">
        <img src="/logo.png" alt="EVdlaCiebie" className="h-12 object-contain" />
        <h1 className="text-4xl font-extrabold text-red-600">Kalkulator Leasingu</h1>
      </div>

      <div className="text-xl font-medium text-center mb-6">
        Cena brutto (PLN):
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="text-center text-2xl font-bold w-48 ml-4 border-b-2 border-red-600 focus:outline-none"
        />
      </div>

      <div className="grid gap-6">
        <div>
          <p className="font-semibold text-lg mb-1">Wkład własny: {initialPercent}% ({initialPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} zł)</p>
          <input type="range" min={0} max={45} value={initialPercent} onChange={(e) => setInitialPercent(Number(e.target.value))} className="w-full accent-red-600" />
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Wykup końcowy: {finalPercent}% ({finalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} zł)</p>
          <input type="range" min={term === 24 ? 18 : 1} max={term === 24 ? 60 : term === 35 ? 50 : term === 47 ? 40 : 30} value={finalPercent} onChange={(e) => setFinalPercent(Number(e.target.value))} className="w-full accent-red-600" />
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Okres leasingu:</p>
          <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full p-3 border rounded-md text-lg">
            <option value={24}>24 miesiące</option>
            <option value={35}>35 miesięcy</option>
            <option value={47}>47 miesięcy</option>
            <option value={59}>59 miesięcy</option>
          </select>
        </div>
      </div>

      {warning && (
        <div className="text-red-600 text-center font-semibold text-sm mt-4">
          ⚠️ Wkład własny musi wynosić minimum 30 000 zł netto, aby skorzystać z dotacji „NaszEauto”.
        </div>
      )}

      <div className="text-center bg-gradient-to-br from-blue-900 to-blue-700 text-yellow-400 py-6 rounded-xl mt-8 shadow-md">
        <p className="text-4xl font-extrabold">
          {isNaN(rate) ? "—" : `${rate.toFixed(2)} zł netto / ${(rateBrutto).toFixed(2)} zł brutto`}
        </p>
        <p className="text-sm font-medium text-white">rata miesięczna</p>
      </div>
    </div>
  );
}