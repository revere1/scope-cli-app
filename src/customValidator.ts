import { FormControl } from '@angular/forms';


export class CustomValidators {

    readonly touched: boolean;
    static hasError(errorCode: string, path?: string[]) {
        let error: any = {

            'invalidMobileNumber': 'InvalidMobile Number',
            'invalidEmailAddress': 'invalidEmailAddress',
            'invalidAadhar': 'invalidAadhar',
            'invalidPan': 'invalidPan',
            'invalidIfscCode': 'invalidIfscCode',
            'invalidText': 'invalidText',
            'invalidField': 'InvalidMobile Field',
            'invalidHeight': 'InvalidHeight',
            'invalidWeight': 'InvalidWeight',
            'invalidZipCode': 'InvalidZipCode',

        }
    }
    static emailValidator(control: FormControl) {
        if (control.value.match(/^[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/)) {
            return null;

        }
        if (control.value === "") {

            return { 'invalidEmailAddress': false }
        }
        else {
            return { 'invalidEmailAddress': true }
        }
    }
    static mobileNumValidator(control: FormControl) {
        if (control.value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) {
            return null;

        }
        if (control.value === "") {

            return { 'invalidMobileNumber': false }
        }
        else {
            return { 'invalidMobileNumber': true }
        }
    }
    static aadharValidator(control: FormControl) {
        if (control.value.match(/[0-9]{12}/)) {
            return null;
        } else if (control.value === "") {
            return { 'invalidAadhar': false }
        }
        else {
            console.log('The else')
            return { 'invalidAadhar': true }

        }
    }
    static panValidator(control: FormControl) {
        if (control.value.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
            return null;

        }
        else if (control.value === "") {

            return { 'invalidPan': false }
        }
        else {
            return { 'invalidPan': true }
        }
    }
    static ifscCodeValidator(control: FormControl) {
        if (control.value.match(/^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/)) {
            return null;

        }
        else if (control.value === "") {

            return { 'invalidIfscCode': false }
        }
        else {
            return { 'invalidIfscCode': true }
        }
    }
    static textValidator(control: FormControl) {
        if (control.value.match(/^[a-zA-Z ]*$/)) {
            return null;

        }
        else if (control.value === "") {

            return { 'invalidText': false }
        }
        else {
            return { 'invalidText': true }
        }
    }
    static heightValidator(control: FormControl) {
        if (control.value.match(/^([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/)) {
            return null;
        }
        else if (control.value === "") {
            return { 'invalidHeight': false }
        }
        else {
            return { 'invalidHeight': true }
        }
    }
    static weightValidator(control: FormControl) {
        if (control.value.match(/^([0-9]|[1-8][0-9]|9[0-9]|[1-4][0-9]{2}|500)$/)) {
            return null;

        }
        else if (control.value === "") {
            return { 'InvalidWeight': false }
        }
        else {
            console.log('The else')
            return { 'InvalidWeight': true }
        }
    }

    static zipCodeValidator(control: FormControl) {
        if (control.value.match(/^\d{5}$/)) {
            return null;

        }
        else if (control.value === "") {
            return { 'InvalidZipCode': false }
        }
        else {
            console.log('The else')
            return { 'InvalidZipCode': true }
        }
    }

    // static numberValidator(control: FormControl) {
    //     if (control.value.match(/^\d{5}$/)) {
    //         return null;

    //     }
    //     else if (control.value === "") {
    //         return { 'InvalidZipCode': false }
    //     }
    //     else {
    //         console.log('The else')
    //         return { 'InvalidZipCode': true }
    //     }
    // }
    // static getValidatorErrorMessage(code: string, fieldLength: number) {
    //     let config: any = {
    //         'error' : 'jjdgfh',
    //         'required': 'This is a required field',
    //         'minlength': 'Minimum length is ' + fieldLength,
    //         'maxlength': 'Maximum length is ' + fieldLength,
    //         'invalidCreditCard': 'Invalid credit card number',
    //         'invalidEmailAddress': 'Invalid email address',
    //         'invalidMobileNumber' : 'InvalidMobile Number',
    //         'invalidPassword': 'Password must be at least 6 characters long, and contain a number and special character.'
    //     };
    //     return config[code];
    // }

    // static required(control: any) {
    //     // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    //     if (control.value ===" "||control.value == null) {
    //         //console.log('hdh'+control.value)
    //         return { 'invalidField': true };
    //     } else {
    //         return null;
    //     }
    // }

    // static emailValidator(control: any) {
    //     // RFC 2822 compliant regex
    //     if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
    //         return undefined;
    //     } else {
    //         return { 'invalidEmailAddress': true };
    //     }
    // }

    // static passwordValidator(control: any) {
    //     // {6,100}           - Assert password is between 6 and 100 characters
    //     // (?=.*[0-9])       - Assert a string has at least one number
    //     if (control.value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!"@#$%^&*]+)$/)) {
    //         return undefined;
    //     } else {
    //        // return { 'invalidPassword': true };
    //     }
    // }

}
