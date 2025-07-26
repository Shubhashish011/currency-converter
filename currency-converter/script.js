const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Load currency options
const currencyList = ["USD", "INR", "EUR", "JPY", "GBP", "AUD", "CAD"];

currencyList.forEach((cur) => {
  let option1 = document.createElement("option");
  option1.value = cur;
  option1.text = cur;
  fromCurrency.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = cur;
  option2.text = cur;
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

// Flag update function
function updateFlags() {
  const fromCode = fromCurrency.value.slice(0, 2);
  const toCode = toCurrency.value.slice(0, 2);
  document.getElementById("from-flag").src = `https://flagsapi.com/${fromCode}/flat/64.png`;
  document.getElementById("to-flag").src = `https://flagsapi.com/${toCode}/flat/64.png`;
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);
window.addEventListener("load", updateFlags);

// Convert function
function convert() {
  const amt = amount.value;

  if (!amt || isNaN(amt)) {
    result.innerText = "❌ Please enter a valid amount.";
    amount.style.border = "2px solid red";
    return;
  } else {
    amount.style.border = "none";
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[to];
      const converted = (amt * rate).toFixed(2);
      result.innerText = `💰 ${amt} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.innerText = "⚠️ API error. Try again later.";
    });
}

document.getElementById("convert").addEventListener("click", convert);

// Swap button logic
document.getElementById("swap").addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateFlags();
});

// Theme toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

