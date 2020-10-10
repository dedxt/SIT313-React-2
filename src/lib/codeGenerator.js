
/**
* Please use appLogger for logging in this file try to abstain from console
* levels of logging:
* - TRACE - ‘blue’
* - DEBUG - ‘cyan’
* - INFO - ‘green’
* - WARN - ‘yellow’
* - ERROR - ‘red’
* - FATAL - ‘magenta’
*/


import UniversalFunctions from '../utils/universalFunctions';
import Services from '../services';
import async from 'async';

const _ = require('underscore');


const generateRandomNumbers = (numberLength, excludeList) => {
    let arrayList = [];
    excludeList = excludeList || [];

    let minString = "0";
    let maxString = "9";

    for (let i = 1; i < numberLength; i++) {
        minString = minString + "0";
        maxString = maxString + "9";
    }
    let minNumber = parseInt(minString);
    let maxNumber = parseInt(maxString);
    //Create list
    for (i = minNumber; i < maxNumber; i++) {
        let digitToCheck = i.toString();
        if (digitToCheck.length < numberLength) {
            let diff = numberLength - digitToCheck.length;
            let zeros = '';
            for (let j = 0; j < diff; j++) {
                zeros += Math.floor((Math.random() * 10) + 1);
            }
            digitToCheck = zeros + digitToCheck
        }
        if (digitToCheck < 999999)
            if (excludeList.indexOf(digitToCheck) == -1) {
                arrayList.push(digitToCheck)
            }
    }
    if (arrayList.length > 0) {
        arrayList = _.shuffle(arrayList);
        return arrayList[0];
    } else {
        return false;
    }
};

exports.generateUniqueCode = (noOfDigits, userRole, callback) => {
    noOfDigits = noOfDigits || 5;
    let excludeArray = [];
    let generatedRandomCode = null;
    async.series([
        (cb) => {
            //Push All generated codes in excludeAry
            if (userRole == UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_ROLES.USER) {
                Services.UserService.getAllGeneratedCodes(function (err, dataAry) {
                    if (err) {
                        cb(err);
                    } else {
                        if (dataAry && dataAry.length > 0) {
                            excludeArray = dataAry
                        }
                        cb();
                    }
                })
            }
            else cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
        }, (cb) => {
            //Generate Random Code of digits specified
            generatedRandomCode = generateRandomNumbers(noOfDigits, excludeArray);
            cb();

        }], (err, data) => {
            callback(err, { number: generatedRandomCode })
        });
};

