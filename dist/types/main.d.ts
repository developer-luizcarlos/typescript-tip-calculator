declare const btnsSelectPercentage: NodeListOf<HTMLButtonElement>;
declare const calcForm: HTMLFormElement | null;
declare const inputWrapperBill: Element | null;
declare const inputWrapperPeople: Element | null;
declare const inputBill: HTMLInputElement | null;
declare const inputPeople: HTMLInputElement | null;
declare const inputPercentage: HTMLInputElement | null;
declare const spanBillError: Element | null;
declare const spanPeopleError: Element | null;
declare const tipInfo: {
    bill: number;
    numberOfPeople: number;
    percentage: number;
    tipAmount: number;
    tipPerPerson: number;
};
declare const displayTip: () => void;
declare const evaluateTip: () => {
    tipAmount: number;
    tipPerPerson: number;
};
declare const getNumericValueFromString: (string: String) => number;
declare const handleErrorMsg: (errorElement: HTMLElement) => {
    show: (inputElement: HTMLElement, message: string) => void;
    hide: (inputElement: HTMLElement) => void;
};
declare const formatMoneyToInputValidValue: (e: Event) => string;
declare const formatToMoney: (value: number) => string;
declare const isInputValueValid: (e: Event) => boolean;
