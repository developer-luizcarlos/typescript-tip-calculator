"use strict";
const btnsSelectPercentage = document.querySelectorAll(".btn--select-percentage");
const calcForm = document.querySelector(".calc__form");
const inputWrapperBill = document.querySelector(".input-wrapper--bill");
const inputWrapperPeople = document.querySelector(".input-wrapper--people");
const inputBill = document.querySelector("#input-bill");
const inputPeople = document.querySelector("#input-people");
const inputPercentage = document.querySelector(".input--percentage");
const spanBillError = document.querySelector(".error-message--bill");
const spanPeopleError = document.querySelector(".error-message--people");
const tipInfo = {
    bill: 0,
    numberOfPeople: 0,
    percentage: 0,
    tipAmount: 0,
    tipPerPerson: 0,
};
const getNumericValueFromString = (string) => {
    return parseFloat(string.replace(/[A-Z]|\s|\W/gi, "").trim());
};
const handleErrorMsg = (errorElement) => {
    const show = (inputElement, message) => {
        inputElement.classList.add("input-wrapper--error");
        errorElement.style.visibility = "visible";
        errorElement.textContent = message;
    };
    const hide = (inputElement) => {
        inputElement.classList.remove("input-wrapper--error");
        errorElement.style.visibility = "hidden";
    };
    return { show, hide };
};
const formatMoneyToInputValidValue = (e) => {
    const inputValue = e.target.value;
    let formattedValue = inputValue;
    formattedValue = inputValue.replace(/[A-Z]|\,|\s|[^\w.]/gi, "").trim();
    return formattedValue;
};
const formatInputValueToMoney = (e) => {
    const inputValue = e.target.value;
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    const formattedValue = formatter.format(Number(inputValue));
    return formattedValue;
};
const isInputValueValid = (e) => {
    const inputValue = e.target.value;
    const isInvalidInputNumberValue = inputValue.trim() !== "" && !isNaN(Number(inputValue));
    return isInvalidInputNumberValue;
};
calcForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
btnsSelectPercentage.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const targetAsBtn = e.target;
        const btnValue = targetAsBtn.innerText.trim();
        const btnValueOnlyNumber = getNumericValueFromString(btnValue);
        tipInfo.percentage = btnValueOnlyNumber;
    });
});
inputPercentage.addEventListener("input", (e) => {
    const value = e.target.value;
    const isValidValue = isInputValueValid(e);
    tipInfo.percentage = isValidValue ? Number(value) : 0;
});
inputBill.addEventListener("input", (e) => {
    const value = e.target.value;
    const controlError = handleErrorMsg(spanBillError);
    const isValidValue = isInputValueValid(e) && Number(value) !== 0;
    if (isValidValue) {
        controlError.hide(inputWrapperBill);
    }
    else {
        controlError.show(inputWrapperBill, "Can't be zero");
    }
    tipInfo.bill = isValidValue ? parseFloat(value) : 0;
});
inputBill.addEventListener("blur", (e) => {
    const controlError = handleErrorMsg(spanBillError);
    if (isInputValueValid(e)) {
        inputBill.value = formatInputValueToMoney(e);
        controlError.hide(inputWrapperBill);
    }
    else {
        controlError.show(inputWrapperBill, "Can't be zero");
    }
});
inputBill.addEventListener("focus", (e) => {
    inputBill.value = formatMoneyToInputValidValue(e);
});
inputPeople.addEventListener("input", (e) => {
    const value = e.target.value;
    const controlError = handleErrorMsg(spanPeopleError);
    const isValidValue = isInputValueValid(e) && Number(value) !== 0;
    if (isValidValue) {
        controlError.hide(inputWrapperPeople);
    }
    else {
        controlError.show(inputWrapperPeople, "Can't be zero");
    }
    tipInfo.numberOfPeople = isValidValue ? parseFloat(value) : 0;
});
