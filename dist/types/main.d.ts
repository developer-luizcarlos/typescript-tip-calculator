declare const calcForm: HTMLFormElement | null;
declare const inputWrapperBill: Element | null;
declare const inputWrapperPeople: Element | null;
declare const inputBill: HTMLInputElement | null;
declare const inputPeople: HTMLInputElement | null;
declare const spanBillError: Element | null;
declare const spanPeopleError: Element | null;
declare const controlErrorMsg: (errorElement: HTMLElement) => {
    show: (inputElement: HTMLElement, message: string) => void;
    hide: (inputElement: HTMLElement) => void;
};
declare const formatMoneyToInputValidValue: (e: Event) => string;
declare const formatInputValueToMoney: (e: Event) => string;
declare const isInputValueInvalid: (e: Event) => boolean;
