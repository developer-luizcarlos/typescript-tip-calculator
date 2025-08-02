// DOM Elements
const btnsSelectPercentage = document.querySelectorAll<HTMLButtonElement>(
  ".btn--select-percentage"
);
const calcForm = document.querySelector<HTMLFormElement>(".calc__form");
const inputWrapperBill = document.querySelector(".input-wrapper--bill");
const inputWrapperPeople = document.querySelector(".input-wrapper--people");
const inputBill = document.querySelector<HTMLInputElement>("#input-bill");
const inputPeople = document.querySelector<HTMLInputElement>("#input-people");
const inputPercentage =
  document.querySelector<HTMLInputElement>(".input--percentage");
const spanBillError = document.querySelector(".error-message--bill");
const spanPeopleError = document.querySelector(".error-message--people");

// Global Variables/Objects
const tipInfo = {
  bill: 0,
  numberOfPeople: 0,
  percentage: 0,
  tipAmount: 0,
  tipPerPerson: 0,
};

// Functions
const displayTip = () => {
  const spanTipAmount = document.querySelector(".tip-info__value--tip-amount");
  const spanTipPerPerson = document.querySelector(
    ".tip-info__value--total-per-person"
  );
  const isTipInfoValid =
    tipInfo.bill != 0 && tipInfo.numberOfPeople != 0 && tipInfo.percentage != 0;

  const handleBillError = handleErrorMsg(spanBillError as HTMLElement);
  const handlePeopleError = handleErrorMsg(spanPeopleError as HTMLElement);

  if (isTipInfoValid) {
    handleBillError.hide(inputWrapperBill as HTMLElement);
    handlePeopleError.hide(inputWrapperPeople as HTMLElement);

    spanTipAmount!.textContent = formatToMoney(evaluateTip().tipAmount);
    spanTipPerPerson!.textContent = formatToMoney(evaluateTip().tipPerPerson);
  } else {
    spanTipAmount!.textContent = formatToMoney(0);
    spanTipPerPerson!.textContent = formatToMoney(0);

    if (tipInfo.bill == 0) {
      handleBillError.show(inputWrapperBill as HTMLElement, "Can't be zero");
    } else if (tipInfo.numberOfPeople == 0) {
      handlePeopleError.show(
        inputWrapperPeople as HTMLElement,
        "Can't be zero"
      );
    }
  }
};

const evaluateTip = () => {
  const tipAmount = tipInfo.bill * (tipInfo.percentage / 100);
  const tipPerPerson = tipAmount / tipInfo.numberOfPeople;
  return {
    tipAmount,
    tipPerPerson,
  };
};

const getNumericValueFromString = (string: String) => {
  return parseFloat(string.replace(/[A-Z]|\s|\W/gi, "").trim());
};

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

const formatToMoney = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedValue = formatter.format(value);
  return formattedValue;
};

const isInputValueValid = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value;
  const isInvalidInputNumberValue =
    inputValue.trim() !== "" && !isNaN(Number(inputValue));
  return isInvalidInputNumberValue;
};

// Events/Functions Applied
calcForm!.addEventListener("submit", (e) => {
  e.preventDefault();
});

btnsSelectPercentage.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const targetAsBtn = e.target as HTMLButtonElement;
    const btnValue = targetAsBtn.innerText.trim();
    const btnValueOnlyNumber = getNumericValueFromString(btnValue);

    tipInfo.percentage = btnValueOnlyNumber;
    displayTip();
  });
});

inputPercentage!.addEventListener("input", (e) => {
  const value = (e.target as HTMLInputElement).value;
  const isValidValue = isInputValueValid(e);

  tipInfo.percentage = isValidValue ? Number(value) : 0;
  displayTip();
});

inputBill!.addEventListener("input", (e) => {
  const value = (e.target as HTMLInputElement).value;
  const controlError = handleErrorMsg(spanBillError as HTMLElement);
  const isValidValue = isInputValueValid(e) && Number(value) !== 0;

  if (isValidValue) {
    controlError.hide(inputWrapperBill as HTMLElement);
  } else {
    controlError.show(inputWrapperBill as HTMLElement, "Can't be zero");
  }

  tipInfo.bill = isValidValue ? parseFloat(value) : 0;

  displayTip();
});

inputBill!.addEventListener("blur", (e) => {
  const inputValue = (e.target as HTMLInputElement).value;
  const controlError = handleErrorMsg(spanBillError as HTMLElement);

  if (isInputValueValid(e)) {
    inputBill!.value = formatToMoney(Number(inputValue));
    controlError.hide(inputWrapperBill as HTMLElement);
  } else {
    controlError.show(inputWrapperBill as HTMLElement, "Can't be zero");
  }
});

inputBill!.addEventListener("focus", (e) => {
  inputBill!.value = formatMoneyToInputValidValue(e);
});

inputPeople!.addEventListener("input", (e) => {
  const value = (e.target as HTMLInputElement).value;
  const controlError = handleErrorMsg(spanPeopleError as HTMLElement);
  const isValidValue = isInputValueValid(e) && Number(value) !== 0;

  if (isValidValue) {
    controlError.hide(inputWrapperPeople as HTMLElement);
  } else {
    controlError.show(inputWrapperPeople as HTMLElement, "Can't be zero");
  }

  tipInfo.numberOfPeople = isValidValue ? parseFloat(value) : 0;
  displayTip();
});
