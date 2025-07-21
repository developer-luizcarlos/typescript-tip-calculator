"use strict";
const inputBill = document.querySelector("#input-bill");
const inputPeople = document.querySelector("#input-percentage");
const spanBillError = document.querySelector(".error-message--bill");
const spanPeopleError = document.querySelector(".error-message--people");
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
inputBill.addEventListener("input", (e) => {
    inputBill.type = "number";
});
