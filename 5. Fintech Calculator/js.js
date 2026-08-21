const rateSlider = document.getElementById('rate');
const yearsSlider = document.getElementById('years');

rateSlider.addEventListener('input', () => {
    document.getElementById('rateDisplay').textContent = rateSlider.value + '%';
});
yearsSlider.addEventListener('input', () => {
    document.getElementById('yearsDisplay').textContent = yearsSlider.value + ' years';
});

function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const monthly = parseFloat(document.getElementById('monthly').value);
    const annualRate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    const monthlyRate = annualRate / 12;
    const months = years * 12;

    let balance = principal;
    let totalContributed = principal;
    let breakdownHTML = '<h3 style="margin-bottom:10px;">📅 Year-by-Year Breakdown</h3>';

    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            balance = balance * (1 + monthlyRate) + monthly;
            totalContributed += monthly;
        }
        breakdownHTML += `
            <div class="year-row">
                <span>Year ${year}</span>
                <span>Balance: $${balance.toLocaleString('en-US', {
                    minimumFractionDigits: 0, maximumFractionDigits: 0
                })}</span>
            </div>`;
    }

    const interestEarned = balance - totalContributed;

    document.getElementById('totalInvested').textContent =
        '$' + totalContributed.toLocaleString('en-US', {maximumFractionDigits: 0});
    document.getElementById('futureValue').textContent =
        '$' + balance.toLocaleString('en-US', {maximumFractionDigits: 0});
    document.getElementById('interestEarned').textContent =
        '+$' + interestEarned.toLocaleString('en-US', {maximumFractionDigits: 0});

    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').style.display = 'grid';
    document.getElementById('yearlyBreakdown').innerHTML = breakdownHTML;
}

// Calculate on page load
calculate();
