let elements = {
    rubl: document.querySelector(".td1"),
    rubl1: document.querySelector(".td11"),
    use: document.querySelector(".td2"),
    use1: document.querySelector(".td21"),
    euro: document.querySelector(".td3"),
    euro1: document.querySelector(".td31"),
    tl: document.querySelector(".td4"),
    tl1: document.querySelector(".td41"),
    input1: document.querySelector(".input1"),
    input2: document.querySelector(".input2"),
    text5: document.querySelector(".text5"),
    text6: document.querySelector(".text6")
};

let leftValue, rightValue, leftName = "RUB", rightName = "USD";
async function fetchExchangeRates() {
    let response = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ePwYxikduilkO3NGz9uUPbfAgkr1ZuKDrBDgJZAt');
    let data = await response.json();
    leftValue = data.data[rightName] / data.data[leftName];
    rightValue = data.data[leftName] / data.data[rightName];
    elements.text5.innerText = `1 ${leftName} = ${leftValue} ${rightName}`;
    elements.text6.innerText = `1 ${rightName} = ${rightValue} ${leftName}`;
}
function convertCurrency() {
    elements.input1.addEventListener("keyup", (e) => {
        elements.input2.value = Math.round(e.target.value * leftValue);
    });

    elements.input2.addEventListener("keyup", (e) => {
        elements.input1.value = Math.round(e.target.value * rightValue);
    });
}
function handleCurrencySelection(currencyName, button) {
    let buttons = [elements.rubl, elements.use, elements.euro, elements.tl];
    buttons.forEach((btn) => {
        btn.style.backgroundColor = btn === button ? "#833cde" : "white";
    });

    leftName = currencyName;
    fetchExchangeRates().then(convertCurrency);
}
function handleReverseCurrencySelection(currencyName, button) {
    let buttons = [elements.rubl1, elements.use1, elements.euro1, elements.tl1];
    buttons.forEach((btn) => {
        btn.style.backgroundColor = btn === button ? "#833cde" : "white";
    });

    rightName = currencyName;
    fetchExchangeRates().then(convertCurrency);
}
function setupCurrencyButtons() {
    elements.rubl.addEventListener("click", () => handleCurrencySelection("RUB", elements.rubl));
    elements.use.addEventListener("click", () => handleCurrencySelection("USD", elements.use));
    elements.euro.addEventListener("click", () => handleCurrencySelection("EUR", elements.euro));
    elements.tl.addEventListener("click", () => handleCurrencySelection("TRY", elements.tl));

    elements.rubl1.addEventListener("click", () => handleReverseCurrencySelection("RUB", elements.rubl1));
    elements.use1.addEventListener("click", () => handleReverseCurrencySelection("USD", elements.use1));
    elements.euro1.addEventListener("click", () => handleReverseCurrencySelection("EUR", elements.euro1));
    elements.tl1.addEventListener("click", () => handleReverseCurrencySelection("TRY", elements.tl1));
}
fetchExchangeRates().then(convertCurrency);
setupCurrencyButtons();
