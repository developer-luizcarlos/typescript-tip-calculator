"use strict";
const inputBill = document.querySelector("#input-bill");
const inputPeople = document.querySelector("#input-people");
const spanBillError = document.querySelector(".error-message--bill");
const spanPeopleError = document.querySelector(".error-message--people");
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
const isInputValueInvalid = (e) => {
    const inputValue = e.target.value;
    const isInvalidInputNumberValue = inputValue.trim() !== "" && !isNaN(Number(inputValue));
    return isInvalidInputNumberValue;
};
inputBill.addEventListener("blur", (e) => {
    inputBill.type = "text";
    if (isInputValueInvalid(e)) {
        inputBill.value = formatInputValueToMoney(e);
    }
    else {
        inputBill.value = "0";
    }
});
inputBill.addEventListener("focus", (e) => {
    inputBill.value = formatMoneyToInputValidValue(e);
});
inputPeople.addEventListener("blur", (e) => {
    inputPeople.type = "text";
    if (isInputValueInvalid(e)) {
        inputPeople.value = formatInputValueToMoney(e);
    }
    else {
        inputPeople.value = "0";
    }
});
inputPeople.addEventListener("focus", (e) => {
    inputPeople.value = formatMoneyToInputValidValue(e);
});
