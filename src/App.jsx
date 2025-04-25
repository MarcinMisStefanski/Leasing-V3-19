
import { useState } from "react";
import "./style.css";

function App() {
  const [price, setPrice] = useState(220000);
  const [initial, setInitial] = useState(20);
  const [monthsIndex, setMonthsIndex] = useState(1);
  const [buyout, setBuyout] = useState(10);

  const allowedDurations = [24, 35, 47, 59];
  const months = allowedDurations[monthsIndex];

  const buyoutLimits = {
    24: { min: 18, max: 60 },
    35: { min: 1, max: 50 },
    47: { min: 1, max: 40 },
    59: { min: 1, max: 30 },
  };

  const initialPayment = (price * initial) / 100;
  const buyoutPayment = (price * buyout) / 100;
  const capital = price - initialPayment - buyoutPayment;
  const leaseInstallment = capital / months;
  const totalCost = leaseInstallment * months + initialPayment + buyoutPayment;
  const costPercent = (totalCost / price) * 100;

  return (
    <div className="container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Kalkulator Leasingu</h1>

      <div className="field">
        <label>
          Cena brutto: {price.toLocaleString("pl-PL", { style: "currency", currency: "PLN" })}
        </label>
        <input
          type="range"
          min="10000"
          max="500000"
          step="1000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Wkład własny: {initial}%</label>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={initial}
          onChange={(e) => {
            const val = Number(e.target.value);
            const clamped = Math.min(Math.max(val, 0), 45);
            setInitial(clamped);
          }}
        />
      </div>

      <div className="field">
        <label>Okres leasingu: {months} miesięcy</label>
        <input
          type="range"
          min="0"
          max={allowedDurations.length - 1}
          step="1"
          value={monthsIndex}
          onChange={(e) => setMonthsIndex(Number(e.target.value))}
        />
      </div>

      <div className="field wykup">
        <label>Wykup: {buyout}%</label>
        <input
          type="range"
          min="1"
          max="60"
          step="1"
          value={buyout}
          onChange={(e) => {
            const val = Number(e.target.value);
            const limits = buyoutLimits[months] || { min: 1, max: 60 };
            const clamped = Math.min(Math.max(val, limits.min), limits.max);
            setBuyout(clamped);
          }}
        />
      </div>

      <div className="result">
        <p>
          Rata brutto:{" "}
          {leaseInstallment.toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN",
          })}
        </p>
        <p>
          Suma kosztów leasingu:{" "}
          {totalCost.toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN",
          })}
        </p>
        <p>Całkowity koszt: {costPercent.toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default App;
