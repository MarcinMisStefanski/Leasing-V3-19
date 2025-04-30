
function updateCalculations() {
    const carPrice = parseFloat(document.getElementById('carPrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPaymentValue').value);
    const leasingMonths = parseInt(document.getElementById('leasingMonths').value);
    const buyoutPercent = parseFloat(document.getElementById('buyoutValue').value);
    const rrso = parseFloat(document.getElementById('rrso').value) / 100;

    const downPaymentAmount = carPrice * (downPaymentPercent / 100);
    const buyoutAmount = carPrice * (buyoutPercent / 100);
    const financedAmount = carPrice - downPaymentAmount - (buyoutPercent <= 1 ? buyoutAmount : 0);

    const monthlyRate = rrso / 12;
    const monthlyPayment = financedAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -leasingMonths));
    const totalPayments = monthlyPayment * leasingMonths;

    const totalCost = totalPayments + downPaymentAmount + buyoutAmount;
    const totalPercent = (totalCost / carPrice) * 100;

    document.getElementById('monthlyPayment').innerText = monthlyPayment.toFixed(2) + " zł";
    document.getElementById('totalCost').innerText = totalCost.toFixed(2) + " zł";
    document.getElementById('totalPercent').innerText = totalPercent.toFixed(1) + "%";
}

document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => {
        if (el.id === 'downPaymentSlider') {
            document.getElementById('downPaymentValue').value = el.value;
        }
        if (el.id === 'downPaymentValue') {
            document.getElementById('downPaymentSlider').value = el.value;
        }
        if (el.id === 'buyoutSlider') {
            document.getElementById('buyoutValue').value = el.value;
        }
        if (el.id === 'buyoutValue') {
            document.getElementById('buyoutSlider').value = el.value;
        }
        updateCalculations();
    });
});

updateCalculations();
