import { argv } from 'node:process';

type test = boolean;

const isTest = (isTest: test) => {
    if (isTest) {
        console.log('is test');
    } else {
        console.log('not implemented');
    }
};

let ranIsTest = false
let passedNodeArgs = false
argv
    .filter((val: string) => {
        if (passedNodeArgs) {
            return true
        } else if (val === '--') {
            passedNodeArgs = true
        }

        return false
    })
    .forEach((val: string, index) => {
        if (val === ('test')) {
            isTest(true);
            ranIsTest = true;
        } else {
            console.error(`value nr. ${index}: ${val} is not an recognised argument`)
        }
    })

if (!ranIsTest) {
    isTest(false)
};