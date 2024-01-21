"use strict";

const numberInput = document.querySelector("#number");
const convertBtn = document.querySelector("#convert-btn");
const resultOutput = document.querySelector("#output");

const symbols = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

let startString = "";

const validateInput = (input) => {
  resultOutput.classList.add("output-alert");
  if (!input) {
    resultOutput.innerHTML = `Please enter a valid number`;
    return false;
  }
  if (input <= 0) {
    resultOutput.innerHTML = "Please enter a number greater than or equal to 1";
    return false;
  }

  if (input > 3999) {
    resultOutput.textContent = `Please enter a number less than or equal to 3999`;
    return false;
  }
  resultOutput.classList.remove("output-alert");
  return true;
};

const numberToRoman = (input) => {
  symbols.forEach((identifier) => {
    const { value, symbol } = identifier;
    const remainder = input % value;
    const quotient = Math.floor(input / value);

    if (!!startString) {
      return;
    }

    if (input !== remainder) {
      numberToRoman(remainder);
      startString = symbol.repeat(quotient) + startString;
    }
  });
};

convertBtn.addEventListener("click", () => {
  resultOutput.classList.remove("hidden");
  if (!validateInput(numberInput?.value)) {
    return;
  }

  numberToRoman(numberInput?.value);
  resultOutput.innerHTML = startString;
  startString = "";
});

numberInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") {
    return;
  }
  e.preventDefault();

  resultOutput.classList.remove("hidden");
  if (!validateInput(numberInput?.value)) {
    return;
  }
  numberToRoman(numberInput?.value);
  resultOutput.innerHTML = startString;
  startString = "";
});
