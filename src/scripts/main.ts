// DOM Elements
const inputBill = document.querySelector<HTMLInputElement>("#input-bill");
const inputPeople =
  document.querySelector<HTMLInputElement>("#input-percentage");
const spanBillError = document.querySelector(".error-message--bill");
const spanPeopleError = document.querySelector(".error-message--people");

// Functions
const formatMoneyToInputValidValue = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value;
  let formattedValue = inputValue;

  formattedValue = inputValue.replace(/[A-Z]|\,|\s|[^\w.]/gi, "").trim();
  return formattedValue;
};

const formatInputValueToMoney = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedValue = formatter.format(Number(inputValue));
  return formattedValue;
};

const isInputValueInvalid = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value;
  const isInvalidInputNumberValue =
    inputValue.trim() !== "" && !isNaN(Number(inputValue));
  return isInvalidInputNumberValue;
};

// Events/Functions Applied
inputBill!.addEventListener("blur", (e) => {
  inputBill!.type = "text";
  if (isInputValueInvalid(e)) {
    inputBill!.value = formatInputValueToMoney(e);
  } else {
    inputBill!.value = "0";
  }
});

inputBill!.addEventListener("focus", (e) => {
  inputBill!.value = formatMoneyToInputValidValue(e);
});
