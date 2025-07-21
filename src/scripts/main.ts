// DOM Elements
const calcForm = document.querySelector<HTMLFormElement>(".calc__form");
const inputWrapperBill = document.querySelector(".input-wrapper--bill");
const inputWrapperPeople = document.querySelector(".input-wrapper--people");
const inputBill = document.querySelector<HTMLInputElement>("#input-bill");
const inputPeople = document.querySelector<HTMLInputElement>("#input-people");
const spanBillError = document.querySelector(".error-message--bill");
const spanPeopleError = document.querySelector(".error-message--people");

// Functions
const handleErrorMsg = (errorElement: HTMLElement) => {
  const show = (inputElement: HTMLElement, message: string) => {
    inputElement!.classList.add("input-wrapper--error");
    errorElement.style.visibility = "visible";
    errorElement.textContent = message;
  };

  const hide = (inputElement: HTMLElement) => {
    inputElement!.classList.remove("input-wrapper--error");
    errorElement.style.visibility = "hidden";
  };

  return { show, hide };
};

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
calcForm!.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputBill!.addEventListener("blur", (e) => {
  const controlError = handleErrorMsg(spanBillError as HTMLElement);

  if (isInputValueInvalid(e)) {
    inputBill!.value = formatInputValueToMoney(e);
    controlError.hide(inputWrapperBill as HTMLElement);
  } else {
    controlError.show(inputWrapperBill as HTMLElement, "Can't be zero");
  }
});

inputBill!.addEventListener("focus", (e) => {
  inputBill!.value = formatMoneyToInputValidValue(e);
});

inputPeople!.addEventListener("blur", (e) => {
  const controlError = handleErrorMsg(spanPeopleError as HTMLElement);

  if (isInputValueInvalid(e)) {
    inputPeople!.value = formatInputValueToMoney(e);
    controlError!.hide(inputWrapperPeople as HTMLElement);
  } else {
    controlError.show(inputWrapperPeople as HTMLElement, "Can't be zero");
  }
});

inputPeople!.addEventListener("focus", (e) => {
  inputPeople!.value = formatMoneyToInputValidValue(e);
});
